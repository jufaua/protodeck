const Pbf = require('pbf');

//Encoding functions
function encode(obj, pbf = new Pbf()) {
  for (var i = 0; i<obj.length; i++) {
    pbf.writeMessage(1, writeTrip , obj[i]);
  }
  return pbf.finish();
}

function writeTrip(obj,pbf) {
  pbf.writePackedVarint(1, obj.color);
  pbf.writeVarintField(2,obj.width);
  var coords = obj.segments;
  writeCoords(coords,pbf);
}

function writeCoords(coords,pbf) {
  var i,j,sum = new Array(2),tsum = new Array(1);
  flatCoords = [];
  times = [];
  for (j = 0; j < 2; j++) {
    sum[j] = 0;
  }
  tsum = 0
  for (i = 0; i<coords.length; i++) {
    for (j = 0; j<2; j++) {
      var n = Math.trunc((coords[i][j] * 100000) - sum[j]);
      flatCoords.push(n);
      sum[j] += n;
    }
    var n = Math.trunc((coords[i][2] * 10) - tsum);
    times.push(n);
    tsum += n;
  }
  pbf.writePackedSVarint(3,flatCoords);
  pbf.writePackedVarint(4,times);
}

//Decoding functions
function decode(pbfInput) {
  var pbf = new Pbf(pbfInput);
  var obj = pbf.readFields(readDataField, []);

  let out = [];

  for (var i = 0; i < obj.length; i++) {
    let oobj = {
      "color": obj[i].color, 
      "width": obj[i].width, 
      "segments": []
    }
    let prev = [0,0,0];
    if (obj[i].times && obj[i].times.length) {
      for (var j = 0; j < obj[i].times.length; j++) {
        oobj.segments.push([(prev[0] + obj[i].coords[2*j])/100000, (prev[1] + obj[i].coords[2*j+1])/100000, (prev[2] + obj[i].times[j])/10]);
        prev = [prev[0] + obj[i].coords[2*j], prev[1] + obj[i].coords[2*j+1], prev[2] + obj[i].times[j]];
      }
    }
    out.push(oobj)
  }
  return out;
}

function readDataField(tag,obj,pbf) {
  if (tag === 1) obj.push(readTrips(pbf,{}));
}

function readTrips(pbf,obj) {
  return pbf.readMessage(readTrip, obj);
}

function readTrip(tag,t,pbf) {
  if (tag === 1) t.color = pbf.readPackedVarint();
  else if (tag === 2) t.width = pbf.readVarint();
  else if (tag === 3) t.coords = pbf.readPackedSVarint();
  else if (tag === 4) t.times = pbf.readPackedVarint();
  return t

}

module.exports = {
   encode,
   decode
}