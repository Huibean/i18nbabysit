import React, { Component } from 'react';
import Highlight from 'react-highlight';
export default class CodePreview extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log("code preview props:", this.props)
    let htmlTemplate = this.props.htmlTemplate;
    let prefixKey = this.props.prefixKey;
    console.log("prefixKey:", prefixKey)
    let tab = '';
    for (var index = 0; index < prefixKey.length; index++) {
      tab += "  "
    }
    console.log("tab: ", tab.length)
    let translateCodes = this.props.translateCodes

    translateCodes = translateCodes.map((translate, index) => {
      translate = translate.map((key) => {
        return tab + key;
      })
      return prefixKey.join("") + translate.join("");
    });
    return(
      <div style={{width: "100%", height: "100%"}}>
        <Highlight className="ERB">
          {htmlTemplate}
        </Highlight>
        <Highlight key={index} className="YAML">
          {translateCodes.join("\n")}
        </Highlight>
        
      </div>
    )
  }
}