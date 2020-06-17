/**
 * Watcher
 * 1. 考虑修改后再刷新(响应式)
 * 2. 再考虑依赖收集(优化)
 * 
 * - get        用来计算或执行函数
 * - update     公共的外部方法, 触发 run
 * - run        判断内部使用异步运行还是同步, 最终会调用 run
 * - cleanupDep 
 */

 /**
  * 依赖收集(当前的 wather 什么被访问到了)和派发更新
  * 访问的时候就会收集, 修改的时候就会更新, 收集什么就会更新什么
  */

import FakeVue from './fakevue'
import { popTarget, pushTarget } from './deps' 
 class Watcher {

    private vm: FakeVue
    private getter: string | Function
    private id: number
    private deps: Array<any> = []
    private depIds: Set<any> = new Set()

    static watcherid: number = 0

    constructor(vm: FakeVue, expOrFn: string | Function) {
        this.vm = vm
        this.getter = expOrFn

        this.id = Watcher.watcherid ++

        this.get()
    }

    get() {
        pushTarget(this)
        if (typeof this.getter === 'function') {
            this.getter.call(this.vm)
        }
        popTarget()
    }

    run() {
        this.get()
    }

    update() {
        this.run();
    }

    cleanupDep() {

    }

    addDep(dep: any) {
        this.deps.push(dep)
    }

 }

 export default Watcher