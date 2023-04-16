import { Suite } from "benchmark";

const EventEmitter2 = require('eventemitter2').EventEmitter2
    , EventEmitter3 = require('eventemitter3')
    , Drip = require('drip').EventEmitter
    , EnhancedDrip = require('drip').EnhancedEmitter
    , FE = require('fast-event-emitter')
    , EE3000 = require("..").EventEmitter3000

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

ee2.on("foo", handle);
ee3.on("foo", handle);
drip.on("foo", handle);
enhancedDrip.on("foo", handle);
fe.on("foo", handle);
ee.on("foo", handle);

console.log("BENCHMARK: asyncEmit")

new Suite()
    .add('EventEmitter2', async function () {
        await ee2.emitAsync('foo');
        await ee2.emitAsync('foo', 'bar');
        await ee2.emitAsync('foo', 'bar', 'baz');
        await ee2.emitAsync('foo', 'bar', 'baz', 'boom');
    })
    .add('EventEmitter3000', async function () {
        await ee.asyncEmit('foo');
        await ee.asyncEmit('foo', 'bar');
        await ee.asyncEmit('foo', 'bar', 'baz');
        await ee.asyncEmit('foo', 'bar', 'baz', 'boom');
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log('Fastest is %s', this.filter('fastest').map('name'));
    })
    .run({ async: true });