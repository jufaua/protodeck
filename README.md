# ProtoDeck
A protocol buffer implementation for some deck.gl layers data formats.

## Rationale
This package serves as a packing tool for some of deck's layer data format. In the case of large dataset of trips, transfer of the data becomes a cumbersome limiting factor. This package gives access to basic encoding/decoding functions to limit the transfer size of the data. 

In the case of trips, it flattens the array of array containing the y,x and time variable that represent one trip entry. Drawing heavily from mapbox's [geobuf](https://github.com/mapbox/geobuf), and using mapbox's [Pbf](https://github.com/mapbox/pbf) library, the flattened array is stored as a diff of the previous element as an int, hence saving some more precious bits. Some values are added for convenience but are optional. For now, color (stored as an rgb array [0-255]), width (uint), id (uint) and category_id (uint) are included.

## Installing

```yarn add proto-deck```

OR

```npm install proto-deck```

Work has begun on utilities to easily convert back and forth, at which point the package will be installable globally with npm, allowing access to said utilities.

## Usage
Usage is as straightforward as it can be. Import or require the package 

```
const ProtoDeck = require('proto-deck');
```

From there, encode or decode the data

```
const buffer = ProtoDeck.encodeTrips(tripsJsonObject);
const json   = ProtoDeck.decodeTrips(buffer);
```

## Coverage
For now, only the trips data format (with minor extensions) is covered. As my needs change, I may add more layer format to the list.
