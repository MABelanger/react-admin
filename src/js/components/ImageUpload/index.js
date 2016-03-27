// inspired by : https://gist.githubusercontent.com/hartzis/0b77920380736f98e4f9/raw/92049c0c4400edf3d889fece1acd8e981c3aa243/ImageUploadComponent.jsx
import React                      from "react";
import "./style.css"

import BtnInfo                    from "../commons/BtnInfo";

export default class ImageUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      dataUri: '',
      url: 'https://pixabay.com/static/uploads/photo/2015/10/01/21/39/background-image-967820_960_720.jpg'
    };
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        dataUri: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  getFileNameUrl(){
    let url = this.state.url;
    return url.substring(url.lastIndexOf('/')+1);
  }

  getFileNameFReader(){
    return this.state.file.name;
  }

  click(){
    //document.getElementById('fileCourseID').click();
    this.refs.inputFile.click();
    return false;
  }

  render() {
    let {dataUri} = this.state;
    let {url} = this.state;
    let $imagePreview = null;
    let fileName = null;

    // build the right imagePreview
    if (dataUri) {
      $imagePreview = (<img src={dataUri} />);
      fileName = this.getFileNameFReader();

    }else {
      $imagePreview = (<img src={url} />);
      fileName = this.getFileNameUrl();
    }

    return (
      <div className="imgPreview">

      <BtnInfo 
        label="Rechercher"
        onClick={(e) => {this.click();} }
      />

        <input 
          type="file"
          ref="inputFile"
          onChange={this._handleImageChange}
        />
        {$imagePreview}
        <div>{fileName}</div>
      </div>
    )
  }
}