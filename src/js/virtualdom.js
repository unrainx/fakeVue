"use strict";
var VirtualNode = /** @class */ (function () {
    // element 
    function VirtualNode(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase();
        this.data = data;
        this.value = value;
        this.type = type;
        this.children = [];
        this.appendChild = this.appendChild.bind(this);
    }
    VirtualNode.prototype.appendChild = function (vnode) {
        this.children.push(vnode);
    };
    return VirtualNode;
}());
// Vue 中使用栈结构代替递归
function virtualNode(node) {
    var nodeType = node.nodeType;
    var vnode;
    // node 类型
    if (nodeType === 1) {
        var nodeName = node.nodeName;
        var nodeAttrs = node.attributes;
        var attrs = {};
        for (var i = 0; i < nodeAttrs.length; i++) {
            // 属性节点 nodeType === 2
            // html 文本中的元素换行会被看作为文本节点
            attrs[nodeAttrs[i].nodeName] = nodeAttrs[i].nodeValue;
        }
        vnode = new VirtualNode(nodeName, attrs, undefined, nodeType);
        var childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            vnode.appendChild(virtualNode(childNodes[i]));
        }
        return vnode;
    }
    else if (nodeType === 3) {
        console.log('text node');
        vnode = new VirtualNode('text', {}, node.nodeValue, nodeType);
        return vnode;
    }
    return null;
}
function parseNode(vnode) {
    // todo
}
var root = document.querySelector('#root');
var vroot = virtualNode(root);
console.log(vroot);
