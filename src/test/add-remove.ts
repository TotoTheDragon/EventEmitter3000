import { EventEmitter3000 } from "..";

describe("add-remove", () => {

    it("emits after adding on listener", (done) => {
        const emitter = new EventEmitter3000();
        emitter.on("foo", done);
        emitter.emit("foo");

    });

    it("emits after adding once listener", (done) => {
        const emitter = new EventEmitter3000();
        emitter.once("foo", done);
        emitter.emit("foo");
    });

    it("does not emit after removing all listeners", (done) => {
        const emitter = new EventEmitter3000();
        emitter.on("foo", done);
        emitter.removeAllListener("foo");
        emitter.emit("foo", new Error("emitted"));
        return done();
    });

});