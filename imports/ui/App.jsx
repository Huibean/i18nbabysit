import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Highlight from 'react-highlight';
import operateText from '../api/algorithm.js';
import CodePreview from './CodePreview.jsx';

import { AppBar, Paper, RaisedButton, FlatButton, TextField, Dialog } from 'material-ui';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import SvgIcon from 'material-ui/SvgIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
      stepIndex: 0,
      template: 1,
      text: ['',''],
      prefixKey: '',
      errorMessage: false
    }
  };

  handleNext() {
    let stepIndex = this.state.stepIndex;
    if (stepIndex < 2 && this.state.text[stepIndex].length < 1) {
      this.setState({errorMessage: true});
    } else {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
    }
  };

  handlePrev() {
   let stepIndex = this.state.stepIndex;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    let stepIndex = this.state.stepIndex;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext.bind(this)}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev.bind(this)}
          />
        )}
      </div>
    );
  };

  getCurrentText(stepIndex) {
    return this.state.text[stepIndex];
  };

  handleTextChange(e) {
    let value = e.target.value;
    let currentText= this.state.text
    currentText[this.state.stepIndex] = value
    this.setState({
      text: currentText
    })
  };

  handleClose() {
    this.setState({errorMessage: false});
  };

  changePrefixKey(e) {
    this.setState({prefixKey: e.target.value})
  }

  render() {
    const {finished, stepIndex} = this.state;
    let items = [
      <MenuItem key={1} value={1} primaryText="Rails erb" />,
      <MenuItem key={2} value={2} disabled={true} primaryText="ejs (not support yet)" />,
      <MenuItem key={3} value={3} disabled={true} primaryText="jade (not support yet)" />,
    ];
    let rightWrap;
    if(stepIndex > 1) {
      let calResult = operateText(this.state.text, this.state.prefixKey);
      console.log("calResult:", calResult)
      rightWrap = <CodePreview 
                    htmlTemplate={calResult.htmlText}
                    prefixKey={calResult.prefixKey}
                    translateCodes={calResult.translateCodes}/>
    } else {
      rightWrap = <TextField
                    id="textArea"
                    multiLine={true}
                    underlineShow={false}
                    floatingLabelText="Put your html code here..."
                    floatingLabelFixed={false}
                    fullWidth={true}
                    rows={15}
                    value={this.getCurrentText(stepIndex)}
                    onChange={this.handleTextChange.bind(this)}
                    textareaStyle={styles.textArea}/>
    }

    let actions = [
      <FlatButton
        label="I Know"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ]

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="I18nbabysit"
            iconElementRight={<FlatButton
                                label="Better Idea?"
                                href="https://github.com/Huibean/i8nbabysit" />} />
     
          <div style={{dispaly: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
            <div style={{float: 'left', minWidth: 300,maxWidth: 400, maxHeight: 400, margin: '', flex: 4, flexGrow: 1}}>

              <SelectField
                value={this.state.template}
                floatingLabelText="Select Template Engine"
              >
                {items}
              </SelectField>

              <Stepper activeStep={stepIndex} orientation="vertical">
                <Step>
                  <StepLabel>Step 1</StepLabel>
                  <StepContent>
                    Input your html like<br/>
                    <Highlight className="html">
                      {"<p>hello world</p>"}
                    </Highlight>
                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Step 2</StepLabel>
                  <StepContent>
                    Input another html like<br/>
                    <Highlight className="html">
                      {"<p>Bonjour le monde</p>"}
                    </Highlight>
                    {this.renderStepActions(1)}
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Step 3</StepLabel>
                  <StepContent>
                    <TextField
                      hintText="Now Config Your Prefix Key"
                      value={this.state.prefixKey}
                      onChange={this.changePrefixKey.bind(this)}
                    />
                    {this.renderStepActions(2)}
                  </StepContent>
                </Step>
              </Stepper>
              {finished && (
                <p style={{margin: '20px 0', textAlign: 'center'}}>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState({stepIndex: 0, finished: false});
                    }}
                  >
                    Click here
                  </a> to Covert Again.
                </p>
              )}
            </div>

            <Paper zDepth={3} style={styles.CodeEditor}>
              {rightWrap}
            </Paper>
          </div>

          <Dialog
            actions={actions}
            modal={false}
            open={this.state.errorMessage}
            onRequestClose={this.handleClose.bind(this)}
          >
            Html Code is required
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
};

const styles = {
  CodeEditor: {
    display: 'flex',
    margin: 20,
    height: 'auto',
    flex: 1,
    flexGrow: 3,
  },
} 