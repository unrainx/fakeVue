export default class VirtualNode {
    public tag: string
    public data: object
    public value: any
    public type: number
    public children: Array<VirtualNode>

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
export function virtualNode(node: HTMLElement): any {
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

export function parseNode(vnode: VirtualNode): any {
    let nodeType = vnode.type
    let node: HTMLElement

    // node 类型
    if (nodeType === 1) {

        node = document.createElement(vnode.tag)

        let data: any = vnode.data
        Object.keys(data).forEach( key => {
            let attrName = key
            let attrValue = data[key]
            node.setAttribute(attrName, attrValue)
        })

        let children = vnode.children
        children.forEach( vn => {
            node.appendChild(parseNode(vn))
        })
        return node

    } else if (nodeType === 3) {
        return document.createTextNode(vnode.value)
    }
    return null
}
