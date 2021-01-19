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
        //.then(() => res.status(201).json({ message: 'Utilisateur créé !', mail: req.body.email, password: hash }))
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
  });
  /*bcrypt.hashSync(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !', mail: req.body.email, password: hash }))
        //.then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));*/
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          // result == true
          if(err) return res.status(500).json({ error, user });
          if(!result) return res.status(401).json({ error: 'Mot de passe incorrect !' });
          return res.status(200).json({
            userId: user._id,
            token: jwt.sign(user._id.toJSON(),'SHINGEKINOKYOJIN'),
          });
        })
        /*bcrypt.compareSync(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              //token: jwt.sign(user.toJSON(),'RANDOM_TOKEN_SECRET',{
                token: jwt.sign(user._id,'RANDOM_TOKEN_SECRET',{
                expiresIn: 604800 // 1 week
              }),
            });
          })
          .catch(error => {res.status(500).json({ error, user })});
      })
        .catch(error => res.status(500).json({ error: error.message }));*/

      })
      .catch(error => res.status(500).json({ error: error.message }));
    };

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json({ users }))
        .catch(error => res.status(500).json({ error }))
}