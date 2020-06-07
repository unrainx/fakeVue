"use strict";
var mustache = /\{\{(.+?)\}\}/g;
var UnVue = /** @class */ (function () {
    function UnVue(args) {
        this.el = args.el;
        this.data = args.data;
        this.$el = document.querySelector(this.el);
        this.templateDOM = this.$el;
        this.render = this.render.bind(this);
        this.render();
    }
    UnVue.prototype.render = function () {
    };
    UnVue.prototype.compiler = function (node) {
    };
    return UnVue;
}());
var data = {
    message: 'Message',
    name: 'XiaoMing',
};
function compiler(template, data) {
    if (template === null) {
        return;
    }
    var childNodes = template.childNodes;
    for (var i = 0; i < childNodes.length; i++) {
        // node type : 1 -> element ; 3 -> text
        var type = childNodes[i].nodeType;
        if (type === 3) {
            var text = childNodes[i].nodeValue;
            // 每匹配一次, 函数就调用一次 group 是 (.+？) 里的内容
            text = text === null || text === void 0 ? void 0 : text.replace(mustache, function (originalValue, group) {
                var key = group.trim();
                var value = data[key];
                return value;
            });
            // debugger : JavaScript keyword 打断点
            childNodes[i].nodeValue = text;
            // text?.replace()
        }
        else if (type === 1) {
            compiler(childNodes[i], data);
        }
    }
}
var element = document.querySelector('#app');
compiler(element, data);
function getValueByPath(instance, path) {
    var paths = path.split('.');
    paths.shift();
    var key;
    var result = instance;
    while (key = paths.shift()) {
        result = result[key];
    }
    return result;
}
var o = {
    d: {
        e: 'WO shi E'
    }
};
console.log(getValueByPath(o, 'o.d'));
