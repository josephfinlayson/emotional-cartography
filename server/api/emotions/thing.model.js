'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  location: Object,
  timestamp: Date,
  uuid: String
});

module.exports = mongoose.model('Thing', ThingSchema);
