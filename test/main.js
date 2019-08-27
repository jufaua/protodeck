'use strict';

const ProtoDeck = require('../index.js');
const test      = require('tap').test;
const fs        = require('fs');
const path      = require('path');

function getJSON(name) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '/' + name)));
}

function mainTest(json) {
  return function(t) {
    let buf = ProtoDeck.encodeTrips(json);
    let out = ProtoDeck.decodeTrips(buf);
    t.end();
  }
}

function ioTest(json) {
  return function(t) {
    const buf = ProtoDeck.encodeTrips(json);
    const out = ProtoDeck.decodeTrips(buf);
    t.same(json,out);
    t.end();
  }
}

test('output from input', mainTest(getJSON('asymmetric_sample.json')));
test('output similar to input', ioTest(getJSON('io.json')));