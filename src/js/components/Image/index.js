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
    };
    this._inputFileChange = this._inputFileChange.bind(this);
  }

  _inputFileChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let dataUri = reader.result;
      let name = this.props.name;

      this.setState({
        file: file,
        dataUri: dataUri
      });

      this.props.changeValue(name, dataUri);
    }

    reader.readAsDataURL(file)
  }

  _getFileNameUrl(){
    let url = this.props.value;
    return url.substring(url.lastIndexOf('/')+1);
  }

  _getFileNameFReader(){
    return this.state.file.name;
  }

  _click(){
    //document.getElementById('fileCourseID').click();
    this.refs.inputFile.click();
    return false;
  }

  render() {
    let {dataUri} = this.state;
    let url = this.props.value;
    let $imagePreview = null;
    let fileName = null;

    // build the right imagePreview
    if (dataUri) {
      $imagePreview = (<img src={dataUri} />);
      fileName = this._getFileNameFReader();

    }else if(url) {
      $imagePreview = (<img src={url} />);
      fileName = this._getFileNameUrl();

    } else {
      $imagePreview = '';
    }

    return (
      <div className="imgPreview">
        <BtnInfo 
          label="Rechercher"
          onClick={(e) => {this._click();} }
        />
        <input 
          type="file"
          ref="inputFile"
          onChange={this._inputFileChange}
        />

        {$imagePreview}

        <div>{fileName}</div>
      </div>
    )
  }
}