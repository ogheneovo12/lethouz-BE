const { User }= require('../models')

module.exports = function (req,res,next) {
  User.findOne({email: req.body.email},(err,user) => {
    if (err) return res.status(500).send("Internal Server Error");

    if (user) return res.staus(400).send({
      email: 'Email: '+req.body.email+' already exists'
    });

    next();
  })
}