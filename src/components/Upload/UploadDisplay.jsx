/*function DisplayUpload(){
  
    renderFileUpload = (uploadedFile, i) => {
      const {
        filename,   // s3 filename
        fileUrl,    // full s3 url of the file
        file,       // file descriptor from the upload
      } = uploadedFile
  
      return (
        <div key={i}>
          <img src={fileUrl} />
          <p>{file.name}</p>
        </div>
      )
    }
  
    render() {
      const {uploadedFiles, s3Url} = this.props
      return (
        <div> 
          {uploadedFiles.map(this.renderFileUpload)}
        </div>
      )
    }
  }
  
  // back in your uploader...
  class S3Uploader extends React.Component {
  
    //...
  
    render() {
      return (
        <DropzoneS3Uploader 
          onFinish={this.handleFinishedUpload} 
          upload={uploadOptions}
        >
          <UploadDisplay />
        </DropzoneS3Uploader>
      )
    }
  }
}
*/