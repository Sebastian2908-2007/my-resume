const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true 
  },
  lastName: {
    type: String,
    required: true,
    trim: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
  },
  descriptionText: {
    type: String,
    required: 'please add project description',
    minlength: 1,
    maxlength: 888
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    match: [ /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, 'number must match format +1 (615) 243-5172  ']
  },
  pictures: {
    type: [String],
    required: false
  }
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;