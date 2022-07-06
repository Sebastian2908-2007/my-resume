const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const FileUpload = require('./FileUpload');
const bcrypt = require('bcrypt');
require('dotenv').config();
const admin = process.env.ADMIN_EMAIL

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
  password: {
   type: String,
   required: true,
   match: [/^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,'password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character and have a length of at least of 8']
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
    match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'number must match phone number format ie. (123) 456-7890 or 123-456-7890']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  pictures: [FileUpload.schema]
});

/*set up hook to set admin boolean to true if correct email is entered on create, this should work well */
/*even if someone knew the correct email because all emails must be unique */
contactSchema.pre('save', async function(next) {
       if (this.isNew || this.isModified('email')) {
          if (this.email === admin ) {
            this.isAdmin = true;
          }
       }
       next();
});

/* set up pre-save middleware to create a password */
contactSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 11;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});

/* compare the incoming password with the hashed password */
contactSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const Contact = model('Contact', contactSchema);

module.exports = Contact;