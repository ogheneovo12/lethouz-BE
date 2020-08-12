const mongoose = require('mongoose');

module.exports = function (URI){
  mongoose.connect(URI,
  {
    useNewUrlParser:true,
    useUnifiedTopology: true
  })
  .then(()=> console.log('mongodb connected successfully'))
  .catch(err => console.log(err))
}