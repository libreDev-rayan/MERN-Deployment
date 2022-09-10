//* REQUIRES
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    firstname :{
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    lastname : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    email : {
        type : String,
        required : true,
        unique : true
    },


    password : {
        type : String,
        required : true,
        minlength : 8
    }


});

const User = mongoose.model( 'users', UserSchema );


const UserModel = {

    createUser : function(newUser) {
        return User.create(newUser) 
    },
    getUserByEmail : function( email ){
        return User.findOne({ email });
    },
    getUserByID : function( _id ){
        return User.findOne({ _id });
    },
    updateUser: function(_id, adminupdated){
        return User.findOneAndUpdate({_id}, {$set : adminupdated}, {new:true})
    },

}

module.exports = {UserModel};