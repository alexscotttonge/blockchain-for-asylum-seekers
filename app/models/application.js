'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var applicationSchema = new Schema({
  applicantName: { type: String, required: true },
  applicantDob: {type: String, required: true },
  passphrase: String,
  verified: {type: Boolean, default: false }
}, {
  timestamps: true
  });

applicationSchema.methods.verify = function(text, cb) {
  var application = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    bcrypt.hash(text, salt, function(err, hash) {
      application.passphrase = hash;
      application.verified = true;
      console.log(application)
      application
      .save()
      .then((item) => cb())
    });
  });
  console.log(application)
};

applicationSchema.statics.comparePassphrase = function (params, cb) {
  this.model('application').findOne({
    applicantName: params.name,
    applicantDob: params.dob,
  }).exec(function (err, app) {
    if (err || !app) return cb(null, false);
    bcrypt.compare(params.passphrase, app.passphrase, function(err, isMatch) {
      cb(null, isMatch, app);
    });   
  })
};

mongoose.model('application', applicationSchema)
