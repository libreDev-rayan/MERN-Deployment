const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({

    review :{
        type : String,
        required : true
    },

    rating : {
        type : Number,
        required : true
    },

    creator : {
        type : String,
        required : true
    },

    movie : {
        type : String,
        required : true
    },

});

const Reviews = mongoose.model( 'reviews', ReviewSchema );



const ReviewsModel = {

    addReview : function(newREV) {
        return Reviews.create(newREV) 
    },
    deleteReviews: function (_id) {
        return Reviews.deleteMany({movie: _id})
    },
    deleteReviewByID : function( _id ){
        return Reviews.findOneAndDelete({ _id  });
    },


}


module.exports = {ReviewsModel,ReviewSchema};