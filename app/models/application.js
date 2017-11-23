'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var applicationSchema = new Schema({
  applicantName: String,
  applicantDob: String
}, {
  timestamps: true
});

mongoose.model('application', applicationSchema)
