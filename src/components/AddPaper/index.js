import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';


import FileUploader from "react-firebase-file-uploader";
 
class AddPaper extends Component {
  state = {
    unitname: "",
    year: 0,
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
 
  handleChangeUnitname = event =>
    this.setState({ unitname: event.target.value });
    handleChangePaperyear = event =>
    this.setState({ year: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    this.props.firebase.addPaperImage()
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
    //   console.log(`The image url: ${this.state.avatarURL}`)
    
  };

  handlePaperUpload = e => {
      e.preventDefault();
      const { unitname, year } = this.state;
      firebase.database().ref(`school/scit/units/${unitname}/files/${year}`).set({
          image: this.state.avatarURL,
          year: year
      })
  }
 
  render() {
    return (
      <div>
        <form>
          <label>Unit name:</label>
          <input
            type="text"
            value={this.state.unitname}
            name="username"
            onChange={this.handleChangeUnitname}
          />
          <label>Exam Paper Year:</label>
          <input
            type="text"
            value={this.state.year}
            name="username"
            onChange={this.handleChangePaperyear}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <a href={this.state.avatarURL} target='_blank' rel="noopener noreferrer">view</a>}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={this.props.firebase.addPaperImage()}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
        <button onClick={this.handlePaperUpload}>Upload Paper</button>
      </div>
    );
  }
}
 
const condition = authUser =>
  authUser && authUser.email === 'kibuika1@gmail.com';
export default withAuthorization(condition)(withFirebase(AddPaper));