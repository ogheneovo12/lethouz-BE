import { User } from '../models';

export function verifyNewUser (req,res,next) {

  User.findOne({email: req.body.email},(err,user) => {
    
    if (err) return res.status(500).send("Internal Server Error");

    if (user) return res.status(400).send({
      email: 'Email: '+req.body.email+' already exists'
    });

    next();
  })

}

export function verifyOldUser(req,res,next) {
  User.findOne({email: req.body.email},(err,user) => {
    
    if (err) return res.status(500).send("Internal Server Error");

    if (user) return res.status(400).send({
      email: 'Email: '+req.body.email+' already exists'
    });

    next();
  })
}