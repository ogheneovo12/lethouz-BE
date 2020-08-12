const mongoose = require('mongoose');

module.exports = function (){
  mongoose.connect('mongodb+srv://user-emmanuel:29-April2001@lethouz.zh0kz.mongodb.net/Lethouz?retryWrites=true&w=majority',
  {
    useNewUrlParser:true,
    useUnifiedTopology: true
  })
  .then(()=> console.log('mongodb connected successfully'))
  .catch(err => console.log(err))
}