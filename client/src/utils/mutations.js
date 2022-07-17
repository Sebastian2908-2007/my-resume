import { gql } from "@apollo/client";

export const ADD_FILE = gql`
   mutation singleFileUpload($ETag:String, $Location:String, $key:String, $Key:String, $Bucket:String) {
  singleFileUpload(ETag:$ETag, Location:$Location, key:$key, Key:$Key, Bucket:$Bucket) {
   _id
   ETag
   Location
   key
   Key
   Bucket

  }
}

`;