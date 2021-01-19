const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 8, function(err, hash) {
    // Store hash in your password DB.
    if(err) return res.status(500).json({ error });
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
        .then(() => res.status(201).json({ message: 'User created !'}))
        .catch(error => res.status(400).json({ error }));
  });
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          // result == true
          if(err) return res.status(500).json({ error, user });
          if(!result) return res.status(401).json({ error: 'Wrong password' });
          return res.status(200).json({
            token: jwt.sign(user._id.toJSON(),'SHINGEKINOKYOJIN'),
          });
        })
      })
      .catch(error => res.status(500).json({ error: error.message }));
    };

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json({ users }))
        .catch(error => res.status(500).json({ error }))
}