# Benchmark results

```
BENCHMARK: add -> remove
EventEmitter2 x 15,905,750 ops/sec ±1.91% (93 runs sampled)
EventEmitter3 x 75,966,377 ops/sec ±0.75% (93 runs sampled)
EnhancedDrip x 2,233,248 ops/sec ±2.00% (94 runs sampled)
Drip x 206,609,678 ops/sec ±1.18% (90 runs sampled)
fastemitter x 190,319,384 ops/sec ±0.41% (95 runs sampled)
EventEmitter3000 x 175,168,357 ops/sec ±0.72% (90 runs sampled)
Fastest is [ 'Drip' ]
```

```
BENCHMARK: emit
EventEmitter2 x 11,681,141 ops/sec ±1.62% (87 runs sampled)
EventEmitter3 x 14,177,901 ops/sec ±1.42% (90 runs sampled)
EnhancedDrip x 1,310,576 ops/sec ±0.70% (94 runs sampled)
Drip x 12,426,569 ops/sec ±1.78% (94 runs sampled)
fastemitter x 67,637,319 ops/sec ±0.86% (91 runs sampled)
EventEmitter3000 x 186,849,020 ops/sec ±0.36% (95 runs sampled)
Fastest is [ 'EventEmitter3000' ]
```

```
BENCHMARK: emit 2 listeners
EventEmitter2 x 5,549,850 ops/sec ±0.84% (91 runs sampled)
EventEmitter3 x 8,531,911 ops/sec ±1.23% (82 runs sampled)
EnhancedDrip x 1,193,549 ops/sec ±0.48% (94 runs sampled)
Drip x 7,617,814 ops/sec ±0.95% (94 runs sampled)
fastemitter x 6,252,260 ops/sec ±1.59% (95 runs sampled)
EventEmitter3000 x 18,721,569 ops/sec ±0.48% (92 runs sampled)
Fastest is [ 'EventEmitter3000' ]
```

```
BENCHMARK: emit (with context)
EventEmitter2 x 11,071,783 ops/sec ±2.12% (90 runs sampled)
EventEmitter3 x 14,179,010 ops/sec ±1.69% (90 runs sampled)
EnhancedDrip x 1,306,997 ops/sec ±0.84% (92 runs sampled)
Drip x 12,007,652 ops/sec ±1.27% (93 runs sampled)
fastemitter x 67,027,730 ops/sec ±1.30% (92 runs sampled)
EventEmitter3000 x 187,314,889 ops/sec ±0.44% (97 runs sampled)
Fastest is [ 'EventEmitter3000' ]
```

```
BENCHMARK: hundreds
EventEmitter2 x 468,651 ops/sec ±0.56% (95 runs sampled)
EventEmitter3 x 577,445 ops/sec ±0.59% (93 runs sampled)
EnhancedDrip x 200,938 ops/sec ±0.97% (94 runs sampled)
Drip x 754,701 ops/sec ±0.47% (96 runs sampled)
fastemitter x 514,664 ops/sec ±0.94% (95 runs sampled)
EventEmitter3000 x 844,830 ops/sec ±0.50% (96 runs sampled)
Fastest is [ 'EventEmitter3000' ]
```

```
BENCHMARK: once -> emit
EventEmitter2 x 9,390,283 ops/sec ±1.22% (93 runs sampled)
EventEmitter3 x 37,757,985 ops/sec ±0.45% (92 runs sampled)
EnhancedDrip x 1,461,955 ops/sec ±0.77% (92 runs sampled)
Drip x 24,115,339 ops/sec ±0.76% (94 runs sampled)
fastemitter x 20,652,682 ops/sec ±0.62% (92 runs sampled)
EventEmitter3000 x 55,169,469 ops/sec ±0.53% (94 runs sampled)
Fastest is [ 'EventEmitter3000' ]
```

```
BENCHMARK: listeners
EventEmitter2 x 25,465,398 ops/sec ±1.29% (91 runs sampled)
EventEmitter3 x 2,200,850 ops/sec ±1.16% (92 runs sampled)
EnhancedDrip x 618,285 ops/sec ±1.04% (97 runs sampled)
Drip x 60,990,920 ops/sec ±0.22% (98 runs sampled)
EventEmitter3000 x 82,059,169 ops/sec ±0.43% (94 runs sampled)
Fastest is [ 'EventEmitter3000' ]
```

```
BENCHMARK: init
EventEmitter2 x 70,104,241 ops/sec ±0.43% (91 runs sampled)
EventEmitter3 x 94,114,445 ops/sec ±0.37% (95 runs sampled)
EnhancedDrip x 63,977,933 ops/sec ±1.02% (96 runs sampled)
Drip x 163,516,649 ops/sec ±0.44% (94 runs sampled)
fastemitter x 85,354,607 ops/sec ±0.37% (94 runs sampled)
EventEmitter3000 x 55,786,661 ops/sec ±0.33% (96 runs sampled)
Fastest is [ 'Drip' ]
```