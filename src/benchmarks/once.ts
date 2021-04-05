import { Suite } from "benchmark";
import { EnhancedEmitter as EnhancedDrip, EventEmitter as Drip } from "drip";
import { EventEmitter2 } from "eventemitter2";
import EventEmitter3 from "eventemitter3";
import FE from "fast-event-emitter";
import { EventEmitter3000 as EE3000 } from "..";


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

console.log("BENCHMARK: once -> emit")

new Suite()
    .add('EventEmitter2', function () {
        ee2.once("foo", handle);
        ee2.emit('foo');
    })
    .add('EventEmitter3', function () {
        ee3.once("foo", handle).emit('foo');
    })
    .add('EnhancedDrip', function () {
        enhancedDrip.once("foo", handle).emit('foo');
    })
    .add('Drip', function () {
        drip.once("foo", handle).emit('foo');
    })
    .add('fastemitter', function () {
        fe.once("foo", handle);
        fe.emit('foo');
    })
    .add('EventEmitter3000', function () {
        ee.once("foo", handle).emit('foo');
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log('Fastest is %s', this.filter('fastest').map('name'));
    })
    .run({ async: true });