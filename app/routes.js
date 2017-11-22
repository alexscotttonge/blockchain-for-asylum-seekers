'use strict';

const express = require('express');
const router = express.Router();

const users = require('./controllers/users');
const applications = require('./controllers/applications')
const ethAccounts = require('./controllers/ethAccounts');
const sessions = require('./controllers/sessions');

router.get('/', (req, res, next) => { res.render('index'); });

router.get('/sessions/new', sessions.new);
router.post('/sessions', sessions.create);
router.get('/sessions/logout', sessions.delete);

router.get('/users/new', users.new);
router.post('/users', users.create);

router.get('/applicants', isLoggedIn, applications.index);
router.post('/applicants', isLoggedIn, applications.create);
router.get('/applicants/new', isLoggedIn, applications.new);

router.post('/identities', ethAccounts.create);

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
