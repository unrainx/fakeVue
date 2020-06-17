import Watcher from "./watcher"

class Dep {

    static depid: number = 0

    // 储存全局的 Watcher
    static target: Watcher | null = null

    private id: number
    private subs: Array<any> = []

    constructor() {
        this.id = Dep.depid ++
    }

    addSub(sub: any) {
        this.subs.push(sub)
    }

    removeSub(sub: any) {
        for (let i = this.subs.length - 1; i >= 0; i--) {
            if (sub === this.subs[i]) {
                this.subs.splice(i, 1)
                break
            }
        }
    }

    /** 将当前 Dep 与当前的 watcher ( 暂时渲染 watcher ) 关联*/
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
            Dep.target.addDep(this)
        }
    }

    notify() {
        let deps = this.subs.slice()

        deps.forEach(watcher => {
            watcher.update()
        });
    }


}

let targetStact: Array<any> = []

export function pushTarget(target: any) {
    targetStact.push(Dep.target)
    Dep.target = target
}

export function popTarget() {
    Dep.target = targetStact.pop()
}

export default Dep
