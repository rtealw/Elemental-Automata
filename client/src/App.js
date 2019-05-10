import React, { Component } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Toolbox from './components/Toolbox';
import Sandbox from './components/Sandbox.js';
import GlobalStyle from './assets/globalStyle.js';
import styled from 'styled-components';
import logo from './assets/automata.png';

/* eslint-disable react/prefer-stateless-function, no-unused-vars */
class App extends Component {
  constructor() {
    super();

    this.state = {
      x: 0,
      y: 0,
      SelectedElement: 'Void',
      BrushSize: '1',
      fill: false,
      play: false,
      step: false,
      saveMode: false,
      start: true
    };
    this.selectElement = this.selectElement.bind(this);
    this.handleFill = this.handleFill.bind(this);
    this.handleStep = this.handleStep.bind(this, 'step');
    this.handlePlay = this.handlePlay.bind(this, 'play');
    this.handleSave = this.handleSave.bind(this);
    this.handleStart = this.handleStart.bind(this, 'start');
  }
  handleSave() {
    this.setState({ saveMode: !this.state.saveMode });
  }
  selectElement(field, evt) {
    this.setState({ [field]: evt });
  }
  handleFill(evt) {
    if (evt === 'clear') {
      this.setState({ SelectedElement: 'Void' });
    }
    this.setState({ fill: !this.state.fill });
  }
  handleStep(field) {
    this.setState({ [field]: !this.state.step });
  }
  handlePlay(field) {
    this.setState({ [field]: !this.state.play });
  }
  handleStart(field) {
    this.setState({ [field]: !this.state.start });
  }

  render() {
    const { x, y } = this.state;
    const Div = styled.div`
      width: 100%;
      height: 50%;
      text-align: center;
      position: fixed;
      top: 25%;
    `;
    const Start = styled.h1`
      margin: 1em auto;
      display: block;
      font-size: 4em;
      color: mediumseagreen;
      animation: blink 3s linear infinite;

      @keyframes blink {
        25% {
          opacity: 0;
        }
        70% {
          opacity: 1;
        }
      }
    `;
    if (this.state.start) {
      return (
        <Div className="App">
          <GlobalStyle start />
          <img src={logo} alt="elemental automata" />{' '}
          <Start onClick={this.handleStart}>START</Start>
        </Div>
      );
    } else {
      return (
        <div className="App">
          <GlobalStyle />
          <Modal
            isOpen={this.state.saveMode}
            toggle={this.handleSave}
            centered
            backdrop
          >
            <ModalHeader>Save This Scenario</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="scenarioName">Scenario Name</Label>
                  <br />
                  <Input
                    type="text"
                    name="scenarioName"
                    id="scenarioName"
                    placeholder="Enter a name for the scenario"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="authorName">Author Name</Label>
                  <br />
                  <Input
                    type="text"
                    name="authorName"
                    id="authorName"
                    placeholder="Enter your name"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleSave}>Submit</Button>
              <Button onClick={this.handleSave}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <Sandbox
            element={this.state.SelectedElement}
            size={this.state.BrushSize}
            fill={this.state.fill}
            filled={this.handleFill}
            step={this.state.step}
            unStep={this.handleStep}
            play={this.state.play}
            save={this.state.save}
            unSave={this.handleSave}
          />
          <Toolbox
            selected={this.selectElement}
            fill={this.state.fill}
            toFill={this.handleFill}
            step={this.handleStep}
            play={this.handlePlay}
            playState={this.state.play}
            saveMode={this.handleSave}
          />
        </div>
      );
    }
  }
}

export default App;
