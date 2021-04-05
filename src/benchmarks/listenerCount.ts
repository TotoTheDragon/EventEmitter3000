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
    , ee = new EE3000();

ee2.setMaxListeners(5000000);

for (let i = 0; i < 25; i++) {
    ee2.on("event", handle);
    ee3.on("event", handle);
    drip.on("event", handle);
    enhancedDrip.on("event", handle);
    ee.on("event", handle);
}

console.log("BENCHMARK: listenerCount")

new Suite()
    .add('EventEmitter2', function () {
        for (let i = 0; i < 10; i++) {
            ee2.listenerCount("event");
        }
    })
    .add('EventEmitter3', function () {
        for (let i = 0; i < 10; i++) {
            ee3.listenerCount("event");
        }
    })
    .add('EnhancedDrip', function () {
        for (let i = 0; i < 10; i++) {
            enhancedDrip.listeners("event").length;
        }
    })
    .add('Drip', function () {
        for (let i = 0; i < 10; i++) {
            drip.listeners("event").length;
        }
    })
    .add('EventEmitter3000', function () {
        for (let i = 0; i < 10; i++) {
            ee.listenerCount("event");
        }
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log('Fastest is %s', this.filter('fastest').map('name'));
    })
    .run({ async: true });