var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
}); 
var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;