import assert from "assert";
import { EventEmitter3000 } from "..";

describe("emitting", () => {

    it("emits", (done) => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", done);

        emitter.emit("foo");
    });

    it("emits with 1 argument", () => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", function () {
            assert.strictEqual(arguments.length, 1);
        });

        emitter.emit("foo", 1);
    });

    it("emits with 5 arguments", () => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", (...args) => {
            assert.strictEqual(args.length, 5);
        });

        emitter.emit("foo", 1, 2, 3, 4, 5);

    });

    it("emits with 10 arguments", () => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", (...args) => {
            assert.strictEqual(args.length, 10);
        });

        emitter.emit("foo", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    });

    it("emits correct arguments", () => {
        const emitter = new EventEmitter3000();

        emitter.on("foo", (number: number, string: string, array: number[], object: object) => {
            assert.strictEqual(number, 5);
            assert.strictEqual(string, "bar");
            assert.deepStrictEqual(array, [1, 2, 3]);
            assert.deepStrictEqual(object, { foo: "bar" });
        });

        emitter.emit("foo", 5, "bar", [1, 2, 3], { foo: "bar" });
    });

    it("emits to all listeners", () => {
        const emitter = new EventEmitter3000();

        let i = 0;

        emitter.on("foo", () => ++i);
        emitter.on("foo", () => ++i);

        emitter.emit("foo");

        assert.strictEqual(i, 2);
    });

    it("returns false when disabled", () => {
        const emitter = new EventEmitter3000();
        emitter.on("foo", () => { });
        emitter.disable("foo");
        assert.strictEqual(emitter.emit("foo"), false);
    })

    it("returns false when no events registered", () => {
        const emitter = new EventEmitter3000();
        assert.strictEqual(emitter.emit("foo"), false);
    })

    it("returns true when event registered", () => {
        const emitter = new EventEmitter3000();
        emitter.on("foo", () => { })
        assert.strictEqual(emitter.emit("foo"), true);
    })

    it("returns true when events registered", () => {
        const emitter = new EventEmitter3000();
        emitter.on("foo", () => { })
        emitter.on("foo", () => { })
        assert.strictEqual(emitter.emit("foo"), true);
    })

});