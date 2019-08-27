#!/usr/bin/env node

const Pbf = require('pbf');
const fs = require('fs');
const ProtoDeck = require('../index.js');
const argv = require('yargs').argv;

const input = argv.i;
const output = argv.o;

//var pbf = new Pbf(fs.readFileSync(input));

var json = ProtoDeck.decodeTrips(fs.readFileSync(input));

fs.writeFileSync(output, JSON.stringify(json));