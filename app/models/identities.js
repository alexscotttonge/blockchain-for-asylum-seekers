'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var identitySchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'applicants'
  },
  accountAddress: String
}, {
    timestamps: true
})

mongoose.model('identities', identitySchema)
