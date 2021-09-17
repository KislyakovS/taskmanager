class Tasks {
    constructor() {
        this._tasks = [];

        this._dataChangeHandlers = [];
    }

    get tasks() {
        return this._tasks;
    }

    set tasks(tasks) {
        this._tasks = [...tasks];
        this._callHandlers(this._dataChangeHandlers);
    }

    updateTask(id, newTask) {
        const index = this._tasks.findIndex(it => it.id === id);

        if (index !== -1) {
            return false;
        }

        this._tasks = [].concat(this._tasks.slice(0, index), newTask, this._tasks.slice(index + 1));

        this._callHandlers(this._dataChangeHandlers);

        return true
    }

    set dataChangeHandlers(handler) {
        this._dataChangeHandlers.push(handler);
    }

    _callHandlers(handlers) {
        handlers.forEach(handler => handler());
    }
}

export {
    Tasks
}