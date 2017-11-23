'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ethAccountSchema = new Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'application'
  },
  accountAddress: String,
  contractAddress: String
}, {
    timestamps: true
})

mongoose.model('ethAccount', ethAccountSchema)
