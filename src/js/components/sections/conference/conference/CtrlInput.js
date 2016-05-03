import React                      from "react";
import TextInput                  from "../../../commons/TextInput";
import ReactQuill                 from "../../../commons/reactQuill";
import Checkbox                   from "../../../commons/Checkbox";
import Image                      from "../../../Image";
import * as sectionHelper         from "../../helper";
import SpeakerInput               from './speakerInput';

export default class ConferenceNameCtrlInput extends React.Component {

// Visible, Titre, Téléphone, Lien Nom, Lien URL, Image
// Résumé Description Côut Note

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      speaker: {
        firstName: "",
        lastName : ""
      },
      title: "",
      tel: "",
      schoolName: "",
      schoolUrl: "",
      image: "",
      abstract: "",
      description: "",
      price: "",
      note: "",
    };
  }

  componentWillMount(){
    this.setState({
      isVisible: this.props.conference.isVisible,
      speaker: this.props.conference.speaker,
      title: this.props.conference.title,
      tel: this.props.conference.tel,
      schoolName: this.props.conference.schoolName,
      schoolUrl: this.props.conference.schoolUrl,
      image: this.props.conference.image,
      abstract: this.props.conference.abstract,
      description: this.props.conference.description,
      price: this.props.conference.price,
      note: this.props.conference.note
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.conference.isVisible,
      speaker: nextProps.conference.speaker,
      title: nextProps.conference.title,
      tel: nextProps.conference.tel,
      schoolName: nextProps.conference.schoolName,
      schoolUrl: nextProps.conference.schoolUrl,
      image: nextProps.conference.image,
      abstract: nextProps.conference.abstract,
      description: nextProps.conference.description,
      price: nextProps.conference.price,
      note: nextProps.conference.note
    });
  }

  changeValue(name, value) {
    let newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  getError(name) {
    if (this.props.errors[name]){
      return this.props.errors[name].message;
    } else {
      return '';
    }
  }

  getFields(){
    return {
      isVisible: this.state.isVisible,
      speaker: this.state.speaker,
      title: this.state.title,
      tel: this.state.tel,
      schoolName: this.state.schoolName,
      schoolUrl: this.state.schoolUrl,
      image: this.state.image,
      abstract: this.state.abstract,
      description: this.state.description,
      price: this.state.price,
      note: this.state.note
    };
  }

/*
{
  "slug": "String",
  "speaker": {
    "slug": "String",
    "firstName": "String",
    "lastName": "String"
  },
  "title": "String",
  "tel": "String",
  "isVisible": true,
  "note": "String",
  "price": "String",
  "schoolName": "String",
  "schoolUrl": "String",
  "description": "String",
  "abstract": "String",
  "schedules": [
    {
      "isFull": false,
      "dayStart": "2016-04-01T11:00:00.000Z",
      "dayEnd": "2016-04-01T12:00:00.000Z",
    }
  ]
}
*/



  render() {
    return (
      <div>
        <Checkbox
          name="isVisible"
          label="Visible"
          ref="isVisible"
          error={sectionHelper.getError("isVisible", this.props.errors)}
          checked={this.state.isVisible}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <SpeakerInput
          name="speaker"
          ref="speakerInput"
          error={this.props.errors}
          speaker={this.state.speaker}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <TextInput
          name="title"
          label="Titre"
          ref="title"
          error={sectionHelper.getError("title", this.props.errors)}
          value={this.state.title}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <TextInput
          name="tel"
          label="Téléphone"
          ref="tel"
          error={sectionHelper.getError("tel", this.props.errors)}
          value={this.state.tel}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <TextInput
          name="schoolName"
          label="Lien Nom"
          ref="schoolName"
          error={sectionHelper.getError("schoolName", this.props.errors)}
          value={this.state.schoolName}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <TextInput
          name="schoolUrl"
          label="Lien URL"
          ref="schoolUrl"
          error={sectionHelper.getError("schoolUrl", this.props.errors)}
          value={this.state.schoolUrl}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <Image
          name="image"
          label="Image"
          ref="courseDescriptionImg"
          error={sectionHelper.getError("image", this.props.errors)}
          value={this.state.image}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <ReactQuill
          name="abstract"
          label="Résumé"
          ref="abstract"
          error={sectionHelper.getError("abstract", this.props.errors)}
          value={this.state.abstract}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <ReactQuill
          name="note"
          label="Note"
          ref="note"
          error={sectionHelper.getError("note", this.props.errors)}
          value={this.state.note}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />

        <ReactQuill
          name="description"
          label="Description"
          ref="description"
          error={sectionHelper.getError("description", this.props.errors)}
          value={this.state.description}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
        <ReactQuill
          name="price"
          label="Prix"
          ref="price"
          error={sectionHelper.getError("price", this.props.errors)}
          value={this.state.price}
          changeValue={ (name, value) => { this.changeValue(name, value); } }
        />
      </div>
    );
  }
}