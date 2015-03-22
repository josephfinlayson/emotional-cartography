/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');
var moment = require('moment')
// Get list of things
exports.index = function (req, res) {

  Thing.find({}, function (err, things) {
    if (err) {
      return handleError(res, err);
    }
    things.forEach(function (thing) {
        //group objects that have similar timestamps

        //grab the timestamp of the first object
        var time = moment(thing.timestamp);
        var relevantThings = []
        //check if an object in the array has a similar timestamp
        things.forEach(
          function(thingToCompare){
          var timeToCompare = moment(thingToCompare.timestamp);
            if (time.isSame(timeToCompare, 'minute')){
              //splice the timeToCompare from the array
              things.splice(thingToCompare, 1)
              //take an average from the key values! be
              relevantThings.push(thingToCompare);
            }
        })

      var hpbmArr = []
      var positivityArr = []
      var loc = {};

      relevantThings.forEach(function(rThing){
        if (rThing.hpbm) {
          hpbmArr.push(rThing.hpbm)
        }

        if (rThing.positivity) {
          positivityArr.push(rThing.positivity)
        }
        if (rThing.loc) {
          loc = rThing.loc;
        }
      });

      if (!_.isEmpty(hpbmArr)) {
        thing.hbpm =  hpbmArr.reduce(function(a, b){return a+b;})/hpbmArr.length;
      }

      if (!_.isEmpty(positivityArr)) {
        thing.positivity=  positivityArr.reduce(function(a, b){return a+b;})/positivityArr.length;
      }
      thing.location = loc;
    });
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
  var objectsSaved = [];
  try {
    req.body.forEach(function (geoObject, index) {
      geoObject.timestamp = moment();                                                                    //15022015214741857
      Thing.create(geoObject, function (err, geoObject) {
        if (err) {
          return handleError(res, err);
        }
        else {
          objectsSaved.push(geoObject);
        }

        if (index === req.body.length - 1) {
          return res.json(201, {savedObjects: objectsSaved.length});
        }
      });
    })
  } catch (e) {
    res.send(JSON.stringify({error: e, body: req.body}))
  }

};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) {
      return handleError(res, err);
    }
    if (!thing) {
      return res.send(404);
    }
    thing.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
