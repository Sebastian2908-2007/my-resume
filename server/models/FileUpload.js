const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const fileUploadSchema = new Schema({
    ETag:{
       type: String,
       required: false
    },
    Location: {
        type: String,
        required: false
    },
    key: {
        type: String,
        required: false
    },
    Key: {
        type: String,
        required: false
    },
    Bucket: {
        type: String,
        required: false
    }
});

const FileUpload = model('FileUpload', fileUploadSchema);

module.exports = FileUpload;