import { Suite } from "benchmark";

import { EventEmitter2 } from "eventemitter2";
import EventEmitter3 from "eventemitter3";
import { EventEmitter as Drip, EnhancedEmitter as EnhancedDrip } from "drip";
import FE from "fast-event-emitter";
import { EventEmitter3000 as EE3000 } from "..";


var emitter;

console.log("BENCHMARK: init")

new Suite()
    .add('EventEmitter2', function () {
        emitter = new EventEmitter2()
    })
    .add('EventEmitter3', function () {
        emitter = new EventEmitter3()
    })
    .add('EnhancedDrip', function () {
        emitter = new EnhancedDrip()
    })
    .add('Drip', function () {
        emitter = new Drip()
    })
    .add('fastemitter', function () {
        emitter = new FE();
    })
    .add('EventEmitter3000', function () {
        emitter = new EE3000();
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log('Fastest is %s', this.filter('fastest').map('name'));
    })
    .run({ async: true });