// create a stack to hold all the drawing operations on
// the canvas.
// to restore the state after resizing the window.
// (canvas resets after resizing)

class Operation {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class OperationsStack {
    constructor() {
        let items = []
    }

    /**
     *
     * @param {Operation} operation
     */
    push(operation) {
        items.push(operation)
    }

    /**
     * @returns {Operation}
     */
    pop() {}
}
