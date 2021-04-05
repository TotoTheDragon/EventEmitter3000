export class EventEmitter3000 {

    private _disabled: object = new Object();
    private _events: object = new Object();

    disable(event: string) {
        this._disabled[event] = true;
    }

    enable(event: string) {
        delete this._disabled[event];
    }

    isEnabled(event: string) {
        return !this._disabled[event];
    }

    addListener(event: string, fn: (...args: any) => any, once?: boolean) {
        if (!this._events[event]) this._events[event] = { fn, once };

        else if (this._events[event].fn)
            this._events[event] = [this._events[event], { fn, once }];

        else
            this._events[event].push({ fn, once });

        return this;
    }

    listeners(event: string): any[] {
        if (!this._events[event]) return [];

        else if (this._events[event].fn) return [this._events[event]];

        return this._events[event];
    }

    listenerCount(event: string): number {
        if (!this._events[event]) return 0;
        if (this._events[event].fn) return 1;
        return this._events[event].length;
    }

    removeListener(event: string, fn: (...args: any) => any) {
        const listeners = this._events[event];

        if (!listeners)
            return false;

        if (listeners.fn === fn) {
            this._events[event] = null;
        }
        else {
            {
                let index = -1;

                for (let i = 0; i < listeners.length; i++) {
                    if (listeners[i].fn === fn) {
                        index = i;
                        break;
                    }
                }

                if (~index) {
                    // Fast splice
                    const length = this._events[event].length - 1;

                    if (length > 1) {
                        const arr = new Array(length);
                        for (let i = 0; i < index; ++i)
                            arr[i] = this._events[event][i];

                        for (let i = index; i < length; ++i)
                            arr[i] = this._events[event][i + 1];

                        this._events[event] = arr;
                    }
                    else if (length === 0)
                        this._events[event] = null;
                    else if (index === 0)
                        this._events[event] = this._events[event][1]
                    else if (index === 1)
                        this._events[event] = this._events[event][0]
                }
            }


        }
    }

    removeAllListener(event: string, fn?: (...args: any) => any) {
        const listeners = this._events[event];

        if (!fn)
            return delete this._events[event];

        if (!listeners)
            return false;

        if (listeners.fn) {
            if (listeners.fn === fn) {
                this._events[event] = null;
                return true;
            }
            else
                return false;
        }

        let found = 0;

        for (let i = listeners.length - 1; i > -1; --i)
            if (listeners[i].fn === fn) ++found;

        if (found === 0)
            return false;

        const length = listeners.length - found;

        if (length === 0) {
            this._events[event] = null;
            return true;
        }

        const arr = new Array(length);
        let lastIndex = 0;

        for (let i = listeners.length - 1; i > -1; --i) {
            if (listeners[i].fn !== fn) {
                arr[lastIndex] = listeners[i];
                ++lastIndex;
                if (lastIndex === length) break;
            }
        }
        this._events[event] = arr;
    }

    on(event: string, fn: (...args: any) => any) {
        return this.addListener(event, fn);
    }

    once(event: string, fn: (...args: any) => any) {
        return this.addListener(event, fn, true);
    }

    private _callListeners(event: string, ...args: any[]) {
        const listeners = this._events[event];
        if (arguments.length === 1) {
            for (let i = listeners.length - 1; i >= 0; --i) {
                listeners[i].fn();
                if (listeners[i].once) this.removeListener(event, listeners[i].fn);
            }
        }
        else if (arguments.length === 2)
            for (let i = listeners.length - 1; i >= 0; --i) {
                listeners[i].fn(arguments[1]);
                if (listeners[i].once) this.removeListener(event, listeners[i].fn);
            }
        else if (arguments.length === 3)
            for (let i = listeners.length - 1; i >= 0; --i) {
                listeners[i].fn(arguments[1], arguments[2]);
                if (listeners[i].once) this.removeListener(event, listeners[i].fn);
            }
        else if (arguments.length === 4)
            for (let i = listeners.length - 1; i >= 0; --i) {
                listeners[i].fn(arguments[1], arguments[2], arguments[3]);
                if (listeners[i].once) this.removeListener(event, listeners[i].fn);
            }
        else if (arguments.length === 5)
            for (let i = listeners.length - 1; i >= 0; --i) {
                listeners[i].fn(arguments[1], arguments[2], arguments[3], arguments[4]);
                if (listeners[i].once) this.removeListener(event, listeners[i].fn);
            }
        else
            for (let i = listeners.length - 1; i >= 0; --i) {
                listeners[i].fn(...args);
                if (listeners[i].once) this.removeListener(event, listeners[i].fn);
            }
    }

    emit(event: string, ...args: any[]): boolean {

        if (this._disabled[event])
            return false;

        if (!this._events[event])
            return false;

        if (this._events[event].fn) {
            this._events[event].fn(...args);
            if (this._events[event].once) this.removeListener(event, this._events[event].fn);
        }
        else
            this._callListeners(event, ...args);

        return true;
    }
}