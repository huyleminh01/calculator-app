export class Stack {
    #elements;
    #length;

    constructor(items) {
        this.#elements = Array.isArray(items) ? items : [];
        this.#length = 0;
    }

    push(element) {
        this.#elements.push(element);
        this.#length++;
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }

        this.#elements.pop();
        this.#length--;
    }

    top() {
        if (this.#length === 0) {
            return;
        }

        return this.#elements[this.#length - 1];
    }

    size() {
        return this.#length;
    }

    isEmpty() {
        return this.#length === 0;
    }

    clear() {
        this.#length = 0;
        this.#elements = [];
    }
}
