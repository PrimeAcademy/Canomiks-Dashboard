/*
import axios from 'axios';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import S3Upload from 'react-s3-uploader/s3upload';
import Dropzone from 'react-dropzone';
import { useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button";
import { useEffect, useState } from 'react';
function Upload() {
  const dispatch = useDispatch();
  const uploadOptions = {
    server: 'http://localhost:5000',
  };
  const s3Url = 'https://prime-canomiks.s3.amazonaws.com';
  const [files, setFiles] = useState('');
  function handleFinishedUpload(files) {
    console.log(files.fileUrl, 'filesss', files);
    dispatch({
      type: 'ADD_URL',
      payload: { pdfUrl: files.fileUrl },
    });
  }
 function handleChange (){
    setFiles({success: false, url : ""});
    
  }
function handleUpload (e){
  let file = this.uploadInput.files[0];
  // Split the filename to get the name and type
  let fileParts = this.uploadInput.files[0].name.split('.');
  let fileName = fileParts[0];
  let fileType = fileParts[1];
  console.log("Preparing the upload");
}
  return (
    <>
      <h3>Click the box to upload a file</h3>
      <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
    onClick={handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
  />
  </ Button>
  <DropzoneS3Uploader
        onFinish={handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />

<button onClick={handleFinishedUpload}> submitty
<input onChange={handleChange} onSubmit={handleUpload} type="file"/>

</button> 
    </>
  );

}
*/
/*import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : ""
    }
  }
  
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
    
  }
  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    console.log(fileName, fileType, fileParts, file)
    axios.post("http://localhost:3000/#/upload",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Recieved a signed request " + signedRequest);
      
     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <Success_message/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}
export default App;
*/
/*
import axios from 'axios';
import React,{Component} from 'react'; 
class App extends Component { 

    state = { 
  
      // Initially, no file is selected 
      selectedFile: null
    }; 
     
    // On file select (from the pop up) 
    onFileChange = event => { 
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
    }; 
     
    // On file upload (click the upload button) 
    onFileUpload = () => { 
      // Create an object of formData 
      const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "myFile", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
     
      // Details of the uploaded file 
      console.log(this.state.selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 
      axios.post("api/orders/url", formData); 
    }; 
     
    // File content to be displayed after 
    // file upload is complete 
    fileData = () => { 
      if (this.state.selectedFile) { 
          
        return ( 
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p> 
          </div> 
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        ); 
      } 
    }; 
     
    render() { 
      return ( 
        <div> 
            <h1> 
              GeeksforGeeks 
            </h1> 
            <h3> 
              File Upload using React! 
            </h3> 
            <div> 
                <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
            </div> 
          {this.fileData()} 
        </div> 
      ); 
    } 
  } 
  
  export default App;
*/
/*import S3 from 'react-aws-s3';

const config = {
    bucketName: 'prime-canomiks',
   
    region: 'us-east-2',
    accessKeyId: 'AKIARKTJQE2NNYW2M6UP',
    secretAccessKey: '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',
    s3Url: 'https://prime-canomiks.s3.amazonaws.com', /* optional */
//} 

//const ReactS3Client = new S3(config);
/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

/* This is optional */
/*const newFileName = 'test-file';

ReactS3Client
    .uploadFile(file, newFileName)
    .then(data => console.log(data))
    .catch(err => console.error(err))

    */
 /*import { getDroppedOrSelectedFiles } from 'html5-file-selector'
function upload(){
  const uploadOptions = {
    server: 'http://localhost:5000',
  };
  const s3Url = 'https://prime-canomiks.s3.amazonaws.com';
    const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
      const text = files.length > 0 ? 'Add more files' : 'Choose files'
      
      return (
        <label style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', padding: 15, borderRadius: 3 }}>
          {text}
          <input
            style={{ display: 'none' }}
            type="file"
            accept={accept}
            multiple
            onChange={e => {
              getFilesFromEvent(e).then(chosenFiles => {
                onFiles(chosenFiles)
              })
            }}
          />
        </label>
      )
    }
    
    const CustomInput = () => {
      const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
      }
    
      const getFilesFromEvent = e => {
        return new Promise(resolve => {
          getDroppedOrSelectedFiles(e).then(chosenFiles => {
            resolve(chosenFiles.map(f => f.fileObject))
          })
        })
      }
    
      return (<>
        <Dropzone
          accept="image/*,audio/*,video/*,.pdf"
          //getUploadParams={() => ({ url: 'https://prime-canomiks.s3.amazonaws.com' })}
          onSubmit={handleSubmit}
          InputComponent={Input}
          getFilesFromEvent={getFilesFromEvent}
          s3Url={s3Url}
          upload={uploadOptions}
        />
       
       </>
      )
    
    }
   
}  
export default upload */

import S3FileUpload from 'react-s3';



import React, {Component} from 'react'
import ReactDom from 'react-dom'
import { uploadFile } from 'react-s3';
const config = {
  bucketName: process.env.AWS_S3_BUCKET,
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  headers: { 'Access-Control-Allow-Origin': '*' },
    ACL: 'public-read',
}
function Upload(){
  
 

function uploading(e){
  console.log(e.target.files[0], 'file');
  S3FileUpload
    .uploadFile(e.target.files[0], config)
    .then(data => console.log(data))
    .catch(err => console.error(err))
  /*ReactS3
    .uploadFile(e.target.files, config)
    .then(data => console.log(data, 'data'))
    .catch(err => console.error(err, 'error'))
    */
 // ReactS3.upload(e.target.files)
  //.then(data => console.log(data))
  //.catch(err => console.error(err))
  //ReactS3.upload(e.target.files[0])
  /*.then((data)=>{
    console.log('data', data)
  }).catch((err)=>
{
  console.log(err, 'error')
}) 
}
*/
}
  return(
    <>
    <input type="file" onChange={(event)=> uploading(event)}></input>
    </>
  )
}

export default Upload
