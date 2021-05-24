const mongoose = require('mongoose');
//chamando o mongoose

const url = 'mongodb://localhost:27017/todo';
mongoose.connect(url, { useNewUrlParser: true});
//faz coneção com o mongoose
module.exports = mongoose;
//retorna para o outro arquivo