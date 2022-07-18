// import just s3 from aws-sdk
const S3 = require('aws-sdk/clients/s3');

// create variables from .env s3 information
const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
// the bottom three are used in the s3 instance
const region = process.env.REACT_APP_AWS_BUCKET_REGION;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY;


// my s3 instance
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey

})

// this will upload a file to my S3 bucket
export function s3Upload(file) {
    const uploadParams = {
        Bucket: bucketName,
        Body: file,
        Key: file.name
    }
    return s3.upload(uploadParams).promise();
};