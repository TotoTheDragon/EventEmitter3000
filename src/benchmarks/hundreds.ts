import { Suite } from "benchmark";

import { EventEmitter2 } from "eventemitter2";
import EventEmitter3 from "eventemitter3";
import { EventEmitter as Drip, EnhancedEmitter as EnhancedDrip } from "drip";
import FE from "fast-event-emitter";
import { EventEmitter3000 as EE3000 } from "..";


function handle() {
    if (arguments.length > 100) console.log('damn');

    return 1;
}

const
    ee2 = new EventEmitter2()
    , ee3 = new EventEmitter3()
    , drip = new Drip()
    , enhancedDrip = new EnhancedDrip()
    , fe = new FE()
    , ee = new EE3000();

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {

        ee2.on('event:' + i, handle);
        ee3.on('event:' + i, handle);
        drip.on('event:' + i, handle);
        enhancedDrip.on('event:' + i, handle);
        fe.on('event:' + i, handle);
        ee.on('event:' + i, handle);
    }
}

console.log("BENCHMARK: hundreds")

new Suite()
    .add('EventEmitter2', function () {
        for (let i = 0; i < 10; i++) {
            ee2.emit('event:' + i);
        }
    })
    .add('EventEmitter3', function () {
        for (let i = 0; i < 10; i++) {
            ee3.emit('event:' + i);
        }
    })
    .add('EnhancedDrip', function () {
        for (let i = 0; i < 10; i++) {
            enhancedDrip.emit('event:' + i);
        }
    })
    .add('Drip', function () {
        for (let i = 0; i < 10; i++) {
            drip.emit('event:' + i);
        }
    })
    .add('fastemitter', function () {
        for (let i = 0; i < 10; i++) {
            fe.emit('event:' + i);
        }
    })
    .add('EventEmitter3000', function () {
        for (let i = 0; i < 10; i++) {
            ee.emit('event:' + i);
        }
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log('Fastest is %s', this.filter('fastest').map('name'));
    })
    .run({ async: true });