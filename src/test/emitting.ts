import assert from "assert";
import { EventEmitter3000 } from "..";

describe("emitting", () => {

    it("emits", (done) => {
        new EventEmitter3000()
            .on("foo", done)
            .emit("foo");
    });

    it("emits with 1 argument", () => {
        new EventEmitter3000()
            .on("foo", (...args) => assert.strictEqual(args.length, 1))
            .emit("foo", 1);
    });

    it("emits with 5 arguments", () => {
        new EventEmitter3000()
            .on("foo", (...args) => assert.strictEqual(args.length, 5))
            .emit("foo", 1, 2, 3, 4, 5);

    });

    it("emits with 10 arguments", () => {
        new EventEmitter3000()
            .on("foo", (...args) => assert.strictEqual(args.length, 10))
            .emit("foo", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    });

    it("emits correct arguments", () => {
        new EventEmitter3000()
            .on("foo", (number: number, string: string, array: number[], object: object) => {
                assert.strictEqual(number, 5);
                assert.strictEqual(string, "bar");
                assert.deepStrictEqual(array, [1, 2, 3]);
                assert.deepStrictEqual(object, { foo: "bar" });
            })
            .emit("foo", 5, "bar", [1, 2, 3], { foo: "bar" });
    });

    it("emits to all listeners", () => {
        let i = 0;

        new EventEmitter3000()
            .on("foo", () => ++i)
            .on("foo", () => ++i)
            .emit("foo");

        assert.strictEqual(i, 2);
    });

    it("returns false when disabled", () => {
        const emitter = new EventEmitter3000()
            .on("foo", () => { })
            .disable("foo");

        assert.strictEqual(emitter.emit("foo"), false);
    })

    it("returns false when no events registered", () => {
        const emitter = new EventEmitter3000();

        assert.strictEqual(emitter.emit("foo"), false);
    })

    it("returns true when event registered", () => {
        const emitter = new EventEmitter3000()
            .on("foo", () => { });

        assert.strictEqual(emitter.emit("foo"), true);
    })

    it("returns true when events registered", () => {
        const emitter = new EventEmitter3000()
            .on("foo", () => { })
            .on("foo", () => { });

        assert.strictEqual(emitter.emit("foo"), true);
    })

});