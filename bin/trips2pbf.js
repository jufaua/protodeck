#!/usr/bin/env node

const Pbf = require('pbf');
const fs = require('fs');
const ProtoDeck = require('../index.js');
const argv = require('yargs').argv;

const input = argv.i;
const output = argv.o;

const string = fs.readFileSync(input, 'utf8');
const obj = JSON.parse(string);

var buffer = ProtoDeck.encodeTrips(obj);

fs.writeFileSync(output, buffer);