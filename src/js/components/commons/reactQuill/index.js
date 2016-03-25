var ReactQuill =                  require('react-quill');
import React                      from "react";


import "react-quill/node_modules/quill/dist/quill.snow.css";
import "./quill.css"

export default class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: "hello"
    };
  }

  initToolbars(){
    this.menuColors = [
      'rgb(  0,   0,   0)',
      'rgb(161,  50,  50)'
    ].map(function(color){ return { value: color } });

    this.toolbarItems = [
      { label:'Text', type:'group', items: [
        { type:'bold', label:'Bold' },
        { type:'italic', label:'Italic' },
        { type:'strike', label:'Strike' },
        { type:'underline', label:'Underline' },
        { type:'separator' },
        { type:'color', label:'Color', items:this.menuColors },

        { type:'separator' },
        { type:'link', label:'Link' }
      ]},

      { label:'Blocks', type:'group', items: [
        { type:'bullet', label:'Bullet' },
        { type:'separator' },
        { type:'list', label:'List' }
      ]},
    ];
  }

  onTextChange(e){
    console.log(e);
  }

  render() {
    this.initToolbars();

    return (
      <div>
        <ReactQuill
          theme="snow"
          value={this.state.description}
          onChange={this.onTextChange}
          >
          <ReactQuill.Toolbar key="toolbar"
                              ref="toolbar"
                              items={this.toolbarItems} />
          <div key="editor"
               ref="editor"
               className="quill-contents"
          />
        </ReactQuill>
      </div>
    );
  }
}

