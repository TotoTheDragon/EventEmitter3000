import assert from "assert";
import { EventEmitter3000 } from "..";

describe("listeners", () => {

    it("returns empty array if no listeners added", () => {
        const emitter = new EventEmitter3000();

        assert.deepStrictEqual(emitter.listeners("foo"), []);
    })

    it("returns array with correct length", () => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", () => { });

        assert.deepStrictEqual(emitter.listeners("foo").length, 1);

        emitter.on("foo", () => { });
        emitter.on("foo", () => { });

        assert.deepStrictEqual(emitter.listeners("foo").length, 3);
    });

    it("returns array of function", () => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", () => { });

        assert.deepStrictEqual(typeof emitter.listeners("foo")[0].fn, "function");
    });

    it("returns array of functions", () => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", () => { });
        emitter.on("foo", () => { });
        emitter.on("foo", () => { });

        for (const listener of emitter.listeners("foo"))
            assert.deepStrictEqual(typeof listener.fn, "function");
    });

})
