var mongoose = require("mysql");
var Schema = mongoose.Schema;
var userschema = new Schema({
        userid:String,
        password:String
});
exports.user = mongoose.model('users',userschema);
