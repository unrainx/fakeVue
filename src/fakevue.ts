import VirtualNode, { virtualNode, parseNode } from './virtualNode'
import Watcher from './watcher'
import Dep from './deps'

interface IFakeVueArg {
    el: string
    data: object
    render?: Function
    [key: string]: any
}

class FakeVue {

    private readonly template: HTMLElement
    private data: any
    private el: string
    private option: IFakeVueArg

    public $el: HTMLElement
    public rootParent: HTMLElement

    constructor(option: IFakeVueArg) {
        this.option = option
        this.el = option.el
        this.data = option.data

        this.template = document.querySelector(this.el) as HTMLElement
        this.rootParent = this.template.parentNode as HTMLElement
        this.$el = this.template

        this.render = this.render.bind(this)
        this.compiler = this.compiler.bind(this)
        this.update = this.update.bind(this)
        this.curryingRender = this.curryingRender.bind(this)
        this.mountComponent = this.mountComponent.bind(this)
        this.mount = this.mount.bind(this)
        this.initData = this.initData.bind(this)

        this.initData()

        this.mount()
    }

    initData() {
        let keys = Object.keys(this.data)

        observer(this.data, this)

        // proxy
        for (let i = 0; i < keys.length; i++) {
            proxy(this, 'data', keys[i])
        }
    }

    render(): VirtualNode { return virtualNode(this.template) }

    mount() {

        if (typeof this.option.render === 'function') {
            return
        }

        // 需要一个 render 生成虚拟 DOM
        this.render = this.curryingRender()
        // console.log(this.render)
        this.mountComponent()
    }

    mountComponent() {
        const mount = () => {
            this.update(this.render())
        }

        new Watcher(this, mount)
    }

    // Vue 使用了二次提交的设计结构
    curryingRender() {
        // 生成 render 函数, 为了缓存抽象语法书, 本框架用 虚拟 DOM 模拟
        // Vue: ast + data = vnode
        // fakeVue: vnode 模板 + data = vnode
        let ast = virtualNode(this.template)
        return () => {
            // 将模板 vnode 转换为 带数据的 node
            return combine(ast, this.data)
        }

    }

    compiler() {
        // 深拷贝一个 DOM
        // let generateNode = this.template.cloneNode(true) as HTMLElement
        // compiler(generateNode, this.data)
        // this.update(generateNode)
    }

    // update(node: Node) {
    //     // DOM 就是模板, 模板应该一直在内存中, 每次变得应该是编译后的 DOM
    //     this.rootParent.replaceChild(node, document.querySelector(this.el) as Node)
    // }

    // 将虚拟 DOM 渲染到页面中, diff算法在其中
    update(vnode: VirtualNode) {
        // 以下未使用 diff 算法, 会将 DOM 整个替换
        let node = parseNode(vnode)

        this.rootParent.replaceChild(node, document.querySelector(this.el) as HTMLElement)    
    }
}

// 这里会调换 DOM 元素, 那么占位符也没有了, 所以要克隆 DOM
function compiler(template: HTMLElement, data: any) {
    const mustache: RegExp = /\{\{(.+?)\}\}/g
    
    let childNodes: NodeListOf<ChildNode> = template.childNodes

    for (let i = 0; i < childNodes.length; i++) {
        // node type : 1 -> element ; 3 -> text
        let type = childNodes[i].nodeType

        if (type === 3) {
            let text = childNodes[i].nodeValue
            
            // 每匹配一次, 函数就调用一次 group 是 (.+？) 里的内容
            text = <string>text?.replace(mustache, function(originalValue: string, group: string): string {
                let path = group.trim()
                let value = curryingValueByPath(path)(data)
                console.log(value)
                return value
            })
            // debugger : JavaScript keyword 打断点
            childNodes[i].nodeValue = text
            // text?.replace()
        } else if (type === 1) {
            compiler(<HTMLElement>childNodes[i], data)
        }
    }
}

function curryingValueByPath(path: string) {
    let paths = path.split('.')

    return function(instance: object) {
        let result: any = instance
        let key: string
        while (key = <string>paths.shift()) {
            result = result[key]
        }
        return result
    }
}

function combine(vnode: VirtualNode, data: any) {
    let type = vnode.type
    let vnodeData = vnode.data
    let value = vnode.value
    let tag = vnode.tag
    let children = vnode.children

    let retVnode = vnode

    // text node
    if (type === 3) {
        const mustache: RegExp = /\{\{(.+?)\}\}/g
        value = value.replace(mustache, function(text: string, group: string) {
            return curryingValueByPath(group.trim())(data)
        })

        retVnode = new VirtualNode(tag, vnodeData, value, type)
    } else if (type === 1) {
        retVnode = new VirtualNode(tag, vnodeData, value, type)
        children.forEach(vn => retVnode?.appendChild(combine(vn, data)))
    }
    return retVnode
}

// 设置响应式对象属性
function defineReactive(target: any, key: string | number | symbol, value: any, enumerable: boolean, vm: FakeVue) {

    let dep = new Dep()

    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: enumerable,

        get() {
            dep.depend()
            return value 
        },

        set(v) {
            if (typeof v === 'object' && v !== null) {
                observer(v, vm)
            }
            value = v
            vm.mountComponent.call(vm)
            dep.notify()
        },
    })
}

function observer(instance: any, vm: FakeVue) {
    // 需要对 instance 本身进行判断
    if (Array.isArray(instance)) {
        // console.log('isArray')
        reactiveArray(instance)
    }

    let keys = Object.keys(instance)
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let attribute = instance[key]

        if (Array.isArray(attribute) || typeof attribute === 'object') {
            defineReactive(instance, key, attribute, true, vm)
            observer(attribute, vm)
        } else {
            defineReactive(instance, key, attribute, true, vm)
        }
    }
    
}

function proxy(instance: any, prop: any, key: any):any {
    Object.defineProperty(instance, key, {
        enumerable: true,
        configurable: true,
        get() { return instance[prop][key] },
        set(value) { instance[prop][key] = value }
    })
}

const reactiveArray = (function() {
    /**
     * 对于加入元素和删除元素的操作, 响应式化
     */
    let ArrayMethod = [
        'push',
        'pop',
        'shift',
        'unshift',
        'reverse',
        'sort',
        'splice',
    ]

    let arrayMethod = Object.create(Array.prototype)

    ArrayMethod.forEach(method => {
        arrayMethod[method] =function() {
            // defineReactive(this[])
            let res = Array.prototype[<any>method].apply(this, arguments)
            return res
        }
    })

    return function(array: any) {
        array.__proto__ = arrayMethod
    }
}())



// Vue 
/**
 * 1. 拿到模板
 * 2. 拿到数据
 * 3. 数据和模板结合 -> DOM
 * 4. 放到页面中
 * 
 * 响应式原理
 * 改动 属性值时, 页面的数据要更新 Object.defineProperty(object, attributeName)
 * writeable, configable, enumerable, set, get
 * 
 * 拦截数组
 */

 
export const __main = function() {
    let app = new FakeVue({
        el: '#root',
        data: {
            name: 'XiaoMing',
            message: 'FakerVue',
            person: {
                name: 'Person',
            },
            arr: [
                1, 2, 4, 4, 5
            ]
        }
    })

    let proxy: any = new Proxy({}, {
        get(target, propKey) {
            return 35
        }
    })

    console.log('Test.')
    console.log('Success')

    return app

}


export default FakeVue