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
      url: this.props.value.url
    };
    this._inputFileChange = this._inputFileChange.bind(this);
  }

/*
  componentWillReceiveProps(nextProps) {
    // reset dataUri if an url is received to use the link url instead.
    console.log('nextProps', nextProps)
    if(nextProps.value){
      this.setState({
        dataUri: null
      });
    }
  }
*/

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

      let image = {
        dataUri: dataUri,
        fileName: file.name,
        url: null
      }
      this.props.changeValue(name, image);
    }

    reader.readAsDataURL(file)
  }

  _getFileNameUrl(url){
    return url.substring(url.lastIndexOf('/')+1);
  }

  _getFileNameFReader(file){
    return file.name;
  }

  _click(){
    //document.getElementById('fileCourseID').click();
    this.refs.inputFile.click();
    return false;
  }

  render() {

    let $imagePreview = null;
    let fileName = null;

    // build the right imagePreview

    console.log('this.props.value',this.props.value);
    if(this.props.value.url) {
      $imagePreview = (<img src={this.props.value.url} />);
      fileName = this._getFileNameUrl(this.props.value.url);

    } else if (this.props.value.dataUri) {
      $imagePreview = (<img src={this.props.value.dataUri} />);
      fileName = this._getFileNameFReader(this.state.file);
    }

    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    return (
      <div className="form-horizontal">
        <div className={wrapperClass}>
          <label htmlFor={this.props.name} className="control-label col-xs-2">
            <br />
            {this.props.label} :
          </label>
          <div className="col-sm-10">
            &nbsp;
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
          </div>
        </div>
      </div>
    )
  }
}