import { LiteralObject } from './util'

interface Subject {
    registerObserver: (observer: Observer) => void
    removeObserver: (observer: Observer) => void
    // removeObserver: () => void
    notifyObserver: (type: string) => void
}

interface Observer {
    type: string
    update: () => void
}

class EventSubject implements Subject {

    private events: LiteralObject

    public constructor() {
        this.events = {}
    }

    public registerObserver(observer: Observer) {
        (this.events[observer.type] || (this.events[observer.type] = [])).push(observer)
    }

    public removeObserver(observer: Observer) {
        const es = this.events[observer.type] || []
        for (let i = 0; i < es.length; i++) {
            if (observer.update === es[i].update) {
                es.pop(es[i].update)
                return
            }
        }
    }

    public notifyObserver(type: string) {
        const es = this.events[type] || []
        for (let i = 0; i < es.length; i++) {
            es[i].update()
        }
    }
}

class EventObserver implements Observer {

    public type: string
    public update: () => void

    public constructor(type: string, update: () => void) {
        this.type = type
        this.update = update
    }
}