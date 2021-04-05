import { Suite } from "benchmark";

import { EventEmitter2 } from "eventemitter2";
import EventEmitter3 from "eventemitter3";
import { EventEmitter as Drip, EnhancedEmitter as EnhancedDrip } from "drip";
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

console.log("BENCHMARK: add -> remove");

new Suite()
    .add('EventEmitter2', function () {
        ee2.on('foo', handle);
        ee2.removeListener('foo', handle);
    })
    .add('EventEmitter3', function () {
        ee3.on('foo', handle);
        ee3.removeListener('foo', handle);
    })
    .add('EnhancedDrip', function () {
        enhancedDrip.on('foo', handle);
        enhancedDrip.removeListener('foo', handle);
    })
    .add('Drip', function () {
        drip.on('foo', handle);
        drip.removeListener('foo', handle);
    })
    .add('fastemitter', function () {
        fe.on('foo', handle);
        fe.off('foo', handle);
    })
    .add('EventEmitter3000', function () {
        ee.on('foo', handle);
        ee.removeListener('foo', handle);
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log('Fastest is %s', this.filter('fastest').map('name'));
    })
    .run({ async: true });