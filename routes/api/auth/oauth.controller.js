const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');

exports.github = (req, res) => {
    res.redirect('/welcome');
}

exports.google = (req, res) => {
    res.redirect('/welcome');
}

exports.facebook = (req, res) => {
    res.redirect('/welcome');
}