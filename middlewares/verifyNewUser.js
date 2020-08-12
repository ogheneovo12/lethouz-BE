const { User }= require('../models')

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {next} next 
 * 
 * @desc checks if user akready exists in database
 */
module.exports = function (req,res,next) {
  User.findOne({email: req.body.email},(err,user) => {
    if (err) res.send(500,"Internal Server Error");

    if (user) res.send(400,{
      email: 'Email already exists'
    });

     next()
  })
}