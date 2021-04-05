import { Suite } from "benchmark";

import { EventEmitter2 } from "eventemitter2";
import EventEmitter3 from "eventemitter3";
import { EventEmitter as Drip, EnhancedEmitter as EnhancedDrip } from "drip";
import FE from "fast-event-emitter";
import { EventEmitter3000 as EE3000 } from "..";


const ctx = { foo: "bar" };

function handle() {
    if (arguments.length > 100) console.log('damn');
}

const
    ee2 = new EventEmitter2()
    , ee3 = new EventEmitter3()
    , drip = new Drip()
    , enhancedDrip = new EnhancedDrip()
    , fe = new FE()
    , ee = new EE3000();

ee2.on("foo", handle.bind(ctx));
ee3.on("foo", handle, ctx);
drip.on("foo", handle.bind(ctx));
enhancedDrip.on("foo", handle.bind(ctx));
fe.on("foo", handle.bind(ctx));
ee.on("foo", handle.bind(ctx));

console.log("BENCHMARK: emit (with context)")

new Suite()
    .add('EventEmitter2', function () {
        ee2.emit('foo');
        ee2.emit('foo', 'bar');
        ee2.emit('foo', 'bar', 'baz');
        ee2.emit('foo', 'bar', 'baz', 'boom');
    })
    .add('EventEmitter3', function () {
        ee3.emit('foo');
        ee3.emit('foo', 'bar');
        ee3.emit('foo', 'bar', 'baz');
        ee3.emit('foo', 'bar', 'baz', 'boom');
    })
    .add('EnhancedDrip', function () {
        enhancedDrip.emit('foo');
        enhancedDrip.emit('foo', 'bar');
        enhancedDrip.emit('foo', 'bar', 'baz');
        enhancedDrip.emit('foo', 'bar', 'baz', 'boom');
    })
    .add('Drip', function () {
        drip.emit('foo');
        drip.emit('foo', 'bar');
        drip.emit('foo', 'bar', 'baz');
        drip.emit('foo', 'bar', 'baz', 'boom');
    })
    .add('fastemitter', function () {
        fe.emit('foo');
        fe.emit('foo', 'bar');
        fe.emit('foo', 'bar', 'baz');
        fe.emit('foo', 'bar', 'baz', 'boom');
    })
    .add('EventEmitter3000', function () {
        ee.emit('foo');
        ee.emit('foo', 'bar');
        ee.emit('foo', 'bar', 'baz');
        ee.emit('foo', 'bar', 'baz', 'boom');
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log('Fastest is %s', this.filter('fastest').map('name'));
    })
    .run({ async: true });