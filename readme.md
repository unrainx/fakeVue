# FakeVue

简易 Vue 框架的实现

## Vue 与模板
1. Template
    1. Tag
    2. template
    3. file component (<template />)

2. Vue Instance
3. mount
    Dom -> string template virtual-dom dom


## 函数柯里化
    函数柯里化是函数式编程的一种用法, 一个函数本来有多个参数, 我们只传入一个参数, 由这个函数生成一个新函数, 由新函数接收剩余的参数来运行原本的逻辑
    之所以要使用柯里化是为了性能, 可以缓存一部分能力
    Vue 中模板中的字符是固定的, 所以我们可以根据内容生成函数

## 虚拟 DOM
    1. DOM -> Virtual DOM
    2. Virtual DOM -> DOM

### Virtual DOM 的 Render 策略


### 

- 读取 将 watcher 存入全局容器, 被称为依赖收集
- 修改 将全局 中的 watcher 取出执行, 被称为派发更新