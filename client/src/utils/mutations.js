import { gql } from "@apollo/client";

export const ADD_FILE = gql`
   mutation singleFileUpload($file: Upload!) {
  singleFileUpload(file: $file) {
   _id
   ETag
   Location
   key
   Key
   Bucket

  }
}

`;