# protodecktrips
A protobuf implementation for the deck.gl trips format/layers

## Rationale
This package serves as a packing tool for deck's trips layer format. In the case of large dataset of trips, transfer of the data becomes a cumbersome limiting factor. This package gives access to basic encoding/decoding functions to soften the transfer size of the data. To do so, it flattens the array of array containing the y,x and time variable that represent a trip. Drawing heavily from mapbox's [geobuf](https://github.com/mapbox/geobuf), and using mapbox's [Pbf](https://github.com/mapbox/pbf) library, the flattened array is stored as a diff of the previous element as an int, hence saving some more precious bits. Some values are added for convenience but are optional. For now, color (stored as an rgb array [0-255]), width (uint), id (uint) and category_id (uint) are included.

## Installing
Publishing to npm is on the TODO list. For now, you'll have to copy manually...

## Usage
Usage is as straightforward as it can be. Import or require the package 

```
const ProtoDeckTrips = require('./path/to/package.js')
```

From there, encode or decode the data

```
const buffer = ProtoDeckTrips.encode(tripsJsonObject);
const json   = ProtoDeckTrips.decode(buffer);
```

## Implementations
Will be used for my implementation of [deck trips](https://github.com/jufaua/deck_trips), that include a playback control panel. That will have to wait for when I decide to publish this to npm... 
