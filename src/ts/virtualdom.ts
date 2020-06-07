class VirtualNode {
    private tag: string
    private data: object
    private value: any
    private type: number
    private children: Array<VirtualNode>

    // element 
    public constructor(tag: string, data: object, value: any, type: number) {
        this.tag = tag && tag.toLowerCase()
        this.data = data
        this.value = value
        this.type = type
        this.children = []

        this.appendChild = this.appendChild.bind(this)
    }

    public appendChild(vnode: VirtualNode) {
        this.children.push(vnode)
    }
}


// Vue 中使用栈结构代替递归
function virtualNode(node: HTMLElement): any {
    let nodeType = node.nodeType
    let vnode: VirtualNode

    // node 类型
    if (nodeType === 1) {
        let nodeName = node.nodeName
        let nodeAttrs = node.attributes
        let attrs: any = {}
        for (let i = 0; i < nodeAttrs.length; i++) {
            // 属性节点 nodeType === 2
            // html 文本中的元素换行会被看作为文本节点
            attrs[nodeAttrs[i].nodeName] = nodeAttrs[i].nodeValue
        }
        vnode = new VirtualNode(
            nodeName,
            attrs,
            undefined,
            nodeType
        )

        let childNodes = node.childNodes
        for (let i = 0; i < childNodes.length; i++) {
            vnode.appendChild(virtualNode(childNodes[i] as HTMLElement))
        }
        return vnode

    } else if (nodeType === 3) {
        console.log('text node')
        vnode = new VirtualNode(
            'text',
            {},
            node.nodeValue,
            nodeType
        )
        return vnode
    }
    return null
}


function parseNode(vnode: VirtualNode): HTMLElement {
    // todo
}

let root = document.querySelector('#root') as HTMLElement
let vroot = virtualNode(root)
console.log(vroot)