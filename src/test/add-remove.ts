import assert from "assert";
import { EventEmitter3000 } from "..";

describe("add-remove", () => {

    it("emits after adding on listener", (done) => {
        new EventEmitter3000()
            .on("foo", done)
            .emit("foo");

    });

    it("emits after adding once listener", (done) => {
        new EventEmitter3000()
            .once("foo", done)
            .emit("foo");
    });

    it("does not emit after removing all listeners", () => {
        new EventEmitter3000()
            .on("foo", () => assert.fail("emitted listener after removing"))
            .removeAllListener("foo")
            .emit("foo");
    });

});