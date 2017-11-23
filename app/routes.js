'use strict';

const express = require('express');
const router = express.Router();

const users = require('./controllers/users');
const applications = require('./controllers/applications')
const ethAccounts = require('./controllers/ethAccounts');
const sessions = require('./controllers/sessions');

router.get('/', (req, res, next) => { res.render('index'); });

router.get('/sessions/new', sessions.new);
router.get('/sessions/logout', sessions.delete);
router.post('/sessions', sessions.create);

router.get('/users/new', users.new);
router.post('/users', users.create);

router.get('/applications', isLoggedIn, applications.index);
router.get('/applications/new', isLoggedIn, applications.new);
router.get('/applications/:ID', isLoggedIn, applications.show);
router.put('/applications/:ID', isLoggedIn, applications.update);
router.post('/applications', isLoggedIn, applications.create);

router.post('/ethAccounts', ethAccounts.create);

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
