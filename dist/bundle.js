/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n// import VirtualNode from './virtual_node'\r\nvar VirtualNode = /** @class */ (function () {\r\n    // element \r\n    function VirtualNode(tag, data, value, type) {\r\n        this.tag = tag && tag.toLowerCase();\r\n        this.data = data;\r\n        this.value = value;\r\n        this.type = type;\r\n        this.children = [];\r\n        this.appendChild = this.appendChild.bind(this);\r\n    }\r\n    VirtualNode.prototype.appendChild = function (vnode) {\r\n        this.children.push(vnode);\r\n    };\r\n    return VirtualNode;\r\n}());\r\nvar EventSubject = /** @class */ (function () {\r\n    function EventSubject() {\r\n        this.events = {};\r\n    }\r\n    EventSubject.prototype.registerObserver = function (observer) {\r\n        (this.events[observer.type] || (this.events[observer.type] = [])).push(observer);\r\n    };\r\n    EventSubject.prototype.removeObserver = function (observer) {\r\n        var es = this.events[observer.type] || [];\r\n        for (var i = 0; i < es.length; i++) {\r\n            if (observer.update === es[i].update) {\r\n                es.pop(es[i].update);\r\n                return;\r\n            }\r\n        }\r\n    };\r\n    EventSubject.prototype.notifyObserver = function (type) {\r\n        var es = this.events[type] || [];\r\n        for (var i = 0; i < es.length; i++) {\r\n            es[i].update();\r\n        }\r\n    };\r\n    return EventSubject;\r\n}());\r\nvar EventObserver = /** @class */ (function () {\r\n    function EventObserver(type, update) {\r\n        this.type = type;\r\n        this.update = update;\r\n    }\r\n    return EventObserver;\r\n}());\r\nvar FakeVue = /** @class */ (function () {\r\n    function FakeVue(option) {\r\n        this.option = option;\r\n        this.el = option.el;\r\n        this.data = option.data;\r\n        this.template = document.querySelector(this.el);\r\n        this.rootParent = this.template.parentNode;\r\n        this.$el = this.template;\r\n        this.render = this.render.bind(this);\r\n        this.compiler = this.compiler.bind(this);\r\n        this.update = this.update.bind(this);\r\n        this.curryingRender = this.curryingRender.bind(this);\r\n        this.mountComponent = this.mountComponent.bind(this);\r\n        this.mount = this.mount.bind(this);\r\n        this.initData = this.initData.bind(this);\r\n        // this.render = this.render.bind(this)\r\n        // this.render = this.render.bind(this)\r\n        // this.render = this.render.bind(this)\r\n        this.initData();\r\n        this.mount();\r\n    }\r\n    FakeVue.prototype.initData = function () {\r\n        var keys = Object.keys(this.data);\r\n        observer(this.data, this);\r\n        // proxy\r\n        for (var i = 0; i < keys.length; i++) {\r\n            proxy(this, 'data', keys[i]);\r\n        }\r\n    };\r\n    FakeVue.prototype.render = function () { return virtualNode(this.template); };\r\n    FakeVue.prototype.mount = function () {\r\n        if (typeof this.option.render === 'function') {\r\n            return;\r\n        }\r\n        // 需要一个 render 生成虚拟 DOM\r\n        this.render = this.curryingRender();\r\n        // console.log(this.render)\r\n        this.mountComponent();\r\n    };\r\n    FakeVue.prototype.mountComponent = function () {\r\n        var _this = this;\r\n        var mount = function () {\r\n            _this.update(_this.render());\r\n        };\r\n        mount.call(this);\r\n    };\r\n    // Vue 使用了二次提交的设计结构\r\n    FakeVue.prototype.curryingRender = function () {\r\n        var _this = this;\r\n        // 生成 render 函数, 为了缓存抽象语法书, 本框架用 虚拟 DOM 模拟\r\n        // Vue: ast + data = vnode\r\n        // fakeVue: vnode 模板 + data = vnode\r\n        var ast = virtualNode(this.template);\r\n        return function () {\r\n            // 将模板 vnode 转换为 带数据的 node\r\n            return combine(ast, _this.data);\r\n        };\r\n    };\r\n    FakeVue.prototype.compiler = function () {\r\n        // 深拷贝一个 DOM\r\n        // let generateNode = this.template.cloneNode(true) as HTMLElement\r\n        // compiler(generateNode, this.data)\r\n        // this.update(generateNode)\r\n    };\r\n    // update(node: Node) {\r\n    //     // DOM 就是模板, 模板应该一直在内存中, 每次变得应该是编译后的 DOM\r\n    //     this.rootParent.replaceChild(node, document.querySelector(this.el) as Node)\r\n    // }\r\n    // 将虚拟 DOM 渲染到页面中, diff算法在其中\r\n    FakeVue.prototype.update = function (vnode) {\r\n        // 以下未使用 diff 算法, 会将 DOM 整个替换\r\n        var node = parseNode(vnode);\r\n        this.rootParent.replaceChild(node, document.querySelector(this.el));\r\n    };\r\n    return FakeVue;\r\n}());\r\n// 这里会调换 DOM 元素, 那么占位符也没有了, 所以要克隆 DOM\r\nfunction compiler(template, data) {\r\n    var mustache = /\\{\\{(.+?)\\}\\}/g;\r\n    var childNodes = template.childNodes;\r\n    for (var i = 0; i < childNodes.length; i++) {\r\n        // node type : 1 -> element ; 3 -> text\r\n        var type = childNodes[i].nodeType;\r\n        if (type === 3) {\r\n            var text = childNodes[i].nodeValue;\r\n            // 每匹配一次, 函数就调用一次 group 是 (.+？) 里的内容\r\n            text = text === null || text === void 0 ? void 0 : text.replace(mustache, function (originalValue, group) {\r\n                var path = group.trim();\r\n                var value = curryingValueByPath(path)(data);\r\n                console.log(value);\r\n                return value;\r\n            });\r\n            // debugger : JavaScript keyword 打断点\r\n            childNodes[i].nodeValue = text;\r\n            // text?.replace()\r\n        }\r\n        else if (type === 1) {\r\n            compiler(childNodes[i], data);\r\n        }\r\n    }\r\n}\r\nfunction curryingValueByPath(path) {\r\n    var paths = path.split('.');\r\n    return function (instance) {\r\n        var result = instance;\r\n        var key;\r\n        while (key = paths.shift()) {\r\n            result = result[key];\r\n        }\r\n        return result;\r\n    };\r\n}\r\nfunction combine(vnode, data) {\r\n    var type = vnode.type;\r\n    var vnodeData = vnode.data;\r\n    var value = vnode.value;\r\n    var tag = vnode.tag;\r\n    var children = vnode.children;\r\n    var retVnode = vnode;\r\n    // text node\r\n    if (type === 3) {\r\n        var mustache = /\\{\\{(.+?)\\}\\}/g;\r\n        value = value.replace(mustache, function (text, group) {\r\n            return curryingValueByPath(group.trim())(data);\r\n        });\r\n        retVnode = new VirtualNode(tag, vnodeData, value, type);\r\n    }\r\n    else if (type === 1) {\r\n        retVnode = new VirtualNode(tag, vnodeData, value, type);\r\n        children.forEach(function (vn) { return retVnode === null || retVnode === void 0 ? void 0 : retVnode.appendChild(combine(vn, data)); });\r\n    }\r\n    return retVnode;\r\n}\r\n// Vue 中使用栈结构代替递归\r\nfunction virtualNode(node) {\r\n    var nodeType = node.nodeType;\r\n    var vnode;\r\n    // node 类型\r\n    if (nodeType === 1) {\r\n        var nodeName = node.nodeName;\r\n        var nodeAttrs = node.attributes;\r\n        var attrs = {};\r\n        for (var i = 0; i < nodeAttrs.length; i++) {\r\n            // 属性节点 nodeType === 2\r\n            // html 文本中的元素换行会被看作为文本节点\r\n            attrs[nodeAttrs[i].nodeName] = nodeAttrs[i].nodeValue;\r\n        }\r\n        vnode = new VirtualNode(nodeName, attrs, undefined, nodeType);\r\n        var childNodes = node.childNodes;\r\n        for (var i = 0; i < childNodes.length; i++) {\r\n            vnode.appendChild(virtualNode(childNodes[i]));\r\n        }\r\n        return vnode;\r\n    }\r\n    else if (nodeType === 3) {\r\n        vnode = new VirtualNode('text', {}, node.nodeValue, nodeType);\r\n        return vnode;\r\n    }\r\n    return null;\r\n}\r\nfunction parseNode(vnode) {\r\n    var nodeType = vnode.type;\r\n    var node;\r\n    // node 类型\r\n    if (nodeType === 1) {\r\n        node = document.createElement(vnode.tag);\r\n        var data_1 = vnode.data;\r\n        Object.keys(data_1).forEach(function (key) {\r\n            var attrName = key;\r\n            var attrValue = data_1[key];\r\n            node.setAttribute(attrName, attrValue);\r\n        });\r\n        var children = vnode.children;\r\n        children.forEach(function (vn) {\r\n            node.appendChild(parseNode(vn));\r\n        });\r\n        return node;\r\n    }\r\n    else if (nodeType === 3) {\r\n        return document.createTextNode(vnode.value);\r\n    }\r\n    return null;\r\n}\r\n// 设置响应式对象属性\r\nfunction defineReactive(target, key, value, enumerable, vm) {\r\n    Object.defineProperty(target, key, {\r\n        configurable: true,\r\n        enumerable: enumerable,\r\n        get: function () { return value; },\r\n        set: function (v) {\r\n            if (typeof v === 'object' && v !== null) {\r\n                observer(v, vm);\r\n            }\r\n            value = v;\r\n            vm.mountComponent.call(vm);\r\n        },\r\n    });\r\n}\r\nfunction observer(instance, vm) {\r\n    // 需要对 instance 本身进行判断\r\n    if (Array.isArray(instance)) {\r\n        // console.log('isArray')\r\n        reactiveArray(instance);\r\n    }\r\n    var keys = Object.keys(instance);\r\n    for (var i = 0; i < keys.length; i++) {\r\n        var key = keys[i];\r\n        var attribute = instance[key];\r\n        if (Array.isArray(attribute) || typeof attribute === 'object') {\r\n            defineReactive(instance, key, attribute, true, vm);\r\n            observer(attribute, vm);\r\n        }\r\n        else {\r\n            defineReactive(instance, key, attribute, true, vm);\r\n        }\r\n    }\r\n}\r\nfunction proxy(instance, prop, key) {\r\n    Object.defineProperty(instance, key, {\r\n        enumerable: true,\r\n        configurable: true,\r\n        get: function () { return instance[prop][key]; },\r\n        set: function (value) { instance[prop][key] = value; }\r\n    });\r\n}\r\nvar reactiveArray = (function () {\r\n    /**\r\n     * 对于加入元素和删除元素的操作, 响应式化\r\n     */\r\n    var ArrayMethod = [\r\n        'push',\r\n        'pop',\r\n        'shift',\r\n        'unshift',\r\n        'reverse',\r\n        'sort',\r\n        'splice',\r\n    ];\r\n    var arrayMethod = Object.create(Array.prototype);\r\n    ArrayMethod.forEach(function (method) {\r\n        arrayMethod[method] = function () {\r\n            // defineReactive(this[])\r\n            console.log(arguments);\r\n            var res = Array.prototype[method].apply(this, arguments);\r\n            return res;\r\n        };\r\n    });\r\n    return function (array) {\r\n        array.__proto__ = arrayMethod;\r\n    };\r\n}());\r\n// Vue \r\n/**\r\n * 1. 拿到模板\r\n * 2. 拿到数据\r\n * 3. 数据和模板结合 -> DOM\r\n * 4. 放到页面中\r\n *\r\n * 响应式原理\r\n * 改动 属性值时, 页面的数据要更新 Object.defineProperty(object, attributeName)\r\n * writeable, configable, enumerable, set, get\r\n *\r\n * 拦截数组\r\n */\r\nvar __main = function () {\r\n    var app = new FakeVue({\r\n        el: '#root',\r\n        data: {\r\n            name: 'XiaoMing',\r\n            message: 'FakerVue',\r\n            person: {\r\n                name: 'Person',\r\n            },\r\n            arr: [\r\n                1, 2, 4, 4, 5\r\n            ]\r\n        }\r\n    });\r\n    var proxy = new Proxy({}, {\r\n        get: function (target, propKey) {\r\n            return 35;\r\n        }\r\n    });\r\n    console.log('FakeVue');\r\n    return app;\r\n};\r\nvar app = __main();\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });