let mustache: RegExp = /\{\{(.+?)\}\}/g

interface IUnVueCtr {
    el: string,
    data: object,
}

class UnVue {
    private el: string
    private data: object
    private $el: HTMLElement | null
    private templateDOM: HTMLElement | null
    
    public constructor(args: IUnVueCtr) {
        this.el = args.el
        this.data = args.data
        this.$el = document.querySelector(this.el)
        this.templateDOM = this.$el
        this.render = this.render.bind(this)
        this.render()
    }

    private render() {

    }

    private compiler(node: HTMLElement) {

    }

}

interface IData {
    message: string,
    name: string,
    [key: string]: any,
}

let data: IData = {
    message: 'Message',
    name: 'XiaoMing',
}

function compiler(template: HTMLElement | null, data: IData) {

    if (template === null) {
        return
    }

    let childNodes: NodeListOf<ChildNode> = template.childNodes
    for (let i = 0; i < childNodes.length; i++) {
        // node type : 1 -> element ; 3 -> text
        let type = childNodes[i].nodeType
        if (type === 3) {
            let text = childNodes[i].nodeValue
            // 每匹配一次, 函数就调用一次 group 是 (.+？) 里的内容
            text = <string>text?.replace(mustache, function(originalValue: string, group: string): string {
                let key = group.trim()
                let value = data[key]
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

let element: HTMLElement | null = document.querySelector('#app')
compiler(element, data)

function getValueByPath(instance: object, path: string) {
    let paths = path.split('.')
    paths.shift()
    let key: string
    let result: any = instance
    while (key = <string>paths.shift()) {
        result = result[key]
    }
    return result
}

let o = {
    d: {
        e: 'WO shi E'
    }
}


console.log(getValueByPath(o, 'o.d'))

