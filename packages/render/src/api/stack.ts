export class Stack<T> {
    items: T[]
    constructor(array: T[]) {
        this.items = array
    }

    push(el: T) {
        this.items.push(el)
    }
    pop() {
        return this.items.pop()
    }
    peek() {
        return this.items[this.items.length - 1]
    }
    clear() {
        this.items = []
    }

    size() {
        return this.items.length
    }

    isEmpty() {
        return this.items.length === 0
    }
}