import assert from "assert";
import { emit } from "node:process";
import { EventEmitter3000 } from "..";

describe('disable -> enable', () => {

    it("returns true when nothing set", () => {
        const emitter = new EventEmitter3000();
        assert.strictEqual(emitter.isEnabled("foo"), true);
    })




    it("returns false after disabling", () => {
        const emitter = new EventEmitter3000();
        emitter.disable("foo");
        assert.strictEqual(emitter.isEnabled("foo"), false);
    })

    it("returns true after reenabling", () => {
        const emitter = new EventEmitter3000();
        emitter.disable("foo");
        emitter.enable("foo");
        assert.strictEqual(emitter.isEnabled("foo"), true);
    })


    it("does not emit after disabling", (done) => {
        const emitter = new EventEmitter3000();
        emitter.disable("foo");
        emitter.on("foo", () => done(new Error("emitted")));
        emitter.emit("foo");
        return done();
    })

})
