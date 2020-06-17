
export type LiteralObject = {
    [key: string]: any
}

class Stack<T> {
    private stack: Array<T> = []

    public push(element: T) {
        this.stack.push(element)
    }

    public pop () {
        this.stack.pop()
    }

    public top(): T | undefined {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1]
        } else {
            return undefined
        }
    }
}