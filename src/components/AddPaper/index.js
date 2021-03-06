import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import * as ROUTES from '../../constants/routes';
import LinearProgress from '@material-ui/core/LinearProgress';

const PageDiv = styled.div`
    margin: 3em;
    padding: 3em;
    width: 70%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5em;
`;
 
class AddPaper extends Component {
  state = {
    unitname: "",
    year: '',
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

 // method that handles the name of the unit
  handleChangeUnitname = event =>
    this.setState({ unitname: event.target.value });

  // method that handles the year the exam was done.
  handleChangePaperyear = event =>
    this.setState({ year: event.target.value });

  // checks the upload progress.
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });

  // checks for errors while uploading
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  // uploads the image to firebase storage.
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    this.props.firebase.addPaperImage()
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
    //   console.log(`The image url: ${this.state.avatarURL}`)
    
  };

  // uploads the exam details to firebase real-time database.
  handlePaperUpload = e => {
      e.preventDefault();
      const { unitname, year } = this.state;
      firebase.database().ref(`school/scit/units/${unitname}/files/${year}`).set({
          image: this.state.avatarURL,
          year: year
      });
      this.props.history.push(ROUTES.HOME);
  }
 
  render() {
    return (
      <PageDiv>
          <div>
                
                <Form>
                <label>Unit name: </label>
                <TextField
                    type="text"
                    value={this.state.unitname}
                    name="username"
                    onChange={this.handleChangeUnitname}
                    style={{marginRight: '2em'}}
                    
                />
                <label >Exam Paper Year: </label>
                <TextField
                    type="text"
                    value={this.state.year}
                    name="username"
                    onChange={this.handleChangePaperyear}
                    style={{marginRight: '2em'}}

                  />
                  
                  {this.state.isUploading && <p className="progress">Progress: <LinearProgress className="" valueBuffer={this.state.progress}/></p>}
                  
                  <FileUploader
                      className="form-labels"
                      accept="image/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={this.props.firebase.addPaperImage()}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                  />
                </Form>
                <label>View Image: </label>{this.state.avatarURL && <a href={this.state.avatarURL} target='_blank' rel="noopener noreferrer">view</a>}
          </div>
        
        <div style={{margin: '2em'}}>
        <Button onClick={this.handlePaperUpload} variant="contained" color='primary'>Upload Paper</Button>

        </div>
      </PageDiv>
    );
  }
}
 
const condition = authUser =>
  authUser && authUser.email === 'kibuika1@gmail.com';
export default withAuthorization(condition)(withFirebase(AddPaper));