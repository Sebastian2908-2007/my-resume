import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {ADD_FILE} from './utils/mutations';
// once file is submitted start with console logging it 
// once its logged we can get the fields associated with it to make a temp typedef
// so we can then tes the mutation 

function TestUpload() {
    const [file, setFile] = useState(null);
    const [addFile, {error}] = useMutation(ADD_FILE);
  
    const handleChange = event => {
      setFile(event.target.files[0]);
    };
  
    const handleSubmit = async event => {
      event.preventDefault();
      console.log(file);
    
       const {data} = await addFile({
        variables: { 
            ETag:'frontendtag',
            Location: 'frontendlocale',
            key:'littlefrontendkey',
            Key:'bigfrontKey',
            Bucket:'fakefrontendBucket'
        }
      });
if(data) {
    console.log(data);
}

      if(error) {
        console.log(error);
      }
     
    };

    return (
       
     <form encType='multipart/form-data'>
     <input type="file" name="file" onChange={handleChange}/>
     <button onClick={handleSubmit}>submit</button> 
     </form>
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