import {useState} from 'react';
//import {useMutation} from '@apollo/client';
//import {ADD_FILE} from './utils/mutations';
import {s3Upload} from './utils/s3';

function TestUpload() {
    const [file, setFile] = useState(null);
    //const [addFile, {error}] = useMutation(ADD_FILE);
  
    const handleChange = event => {
      setFile(event.target.files[0]);
    };
  
    const handleSubmit = async event => {
      event.preventDefault();
      console.log(file);
      const myUpload = await s3Upload(file);
      console.log(myUpload);
       /*const {data} = await addFile({
        variables: { 
            ETag:'frontendtag3',
            Location: 'frontendlocale3',
            key:'littlefrontendkey3',
            Key:'bigfrontKey3',
            Bucket:'fakefrontendBucket3'
        }
      });
if(data) {
    console.log(data);
}

      if(error) {
        console.log(error);
      }*/
     
    };
    const myImage="https://my-resume1177.s3.amazonaws.com/Screenshot (3051).png"
    
    return (
      <div>
     <form encType='multipart/form-data'>
     <input type="file" name="file" onChange={handleChange}/>
     <button onClick={handleSubmit}>submit</button> 
     </form>
     
     <img height='200px' width='200px' src={myImage} alt='my'/>
     </div>
    )
};

export default TestUpload;

/*
     const [file, setFile] = useState(null);
    const [addFile] = useMutation(ADD_FILE);
  
    const handleChange = event => {
      setFile(event.target.files[0]);
    };
   

       const handleSubmit = async event => {
      event.preventDefault();
      console.log(file);
      await addFile({
        variables: { file } 
      });
    };


     <form>
    <input type="file" onChange={handleChange}/>
    <button onClick={handleSubmit}>submit</button> 
    </form>
*/