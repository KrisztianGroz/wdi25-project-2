const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});


commentSchema.methods.ownedBy =function ownedBy(user) {
  return this.createdBy.id === user.id;
};


const sessionSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String, enum: ['dance', 'yoga', 'kungfu'] },
  address: {
    fullAddress: { type: String, required: true},
    street: { type: String},
    city: { type: String, required: true},
    postcode: { type: String, required: true },
    country: {type: String, required: true },
    lat: {type: Number },
    lng: {type: Number },
    full: { type: String},
    postCode: { type: String}

  },
  image: { type: String, required: true },
  stars: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ]
});
module.exports = mongoose.model('Session', sessionSchema );
