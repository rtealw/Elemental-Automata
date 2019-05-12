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
  Input,
  FormFeedback
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
      scenarioName: '',
      authorName: '',
      x: 0,
      y: 0,
      SelectedElement: 'Rock',
      BrushSize: '1',
      fill: false,
      play: false,
      step: false,
      saveMode: false,
      start: true,
      scenarios: undefined,
      scenarioMode: undefined,
      newGrid: undefined,
      saveGrid: false,
      savePrivacy: true,
      search: ''
    };
    this.getScenarios = this.getScenarios.bind(this);
    this.changeGrid = this.changeGrid.bind(this);
    this.changeGridByLink = this.changeGridByLink.bind(this);
    this.handleSearch = this.handleTextUpdate.bind(this, 'search');
    this.selectElement = this.selectElement.bind(this);
    this.handleFill = this.handleFill.bind(this);
    this.handleStep = this.handleStep.bind(this, 'step');
    this.handlePlay = this.handlePlay.bind(this, 'play');
    this.handleSave = this.handleSave.bind(this);
    this.handleStart = this.handleStart.bind(this, 'start');
    this.setScenarioName = this.setScenarioName.bind(this);
    this.setAuthorName = this.setAuthorName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.unSaveGrid = this.unSaveGrid.bind(this);
    this.handleExplore = this.handleExplore.bind(this);
    this.setSaveOption = this.setSaveOption.bind(this);
  }

  handleTextUpdate(field, event) {
    this.setState({ [field]: event.target.value });
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

  getScenarios() {
    fetch('/api/scenarios/')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then(data => {
        this.setState({ scenarios: data });
      })
      .catch(err => console.log(err)); // eslint-disable-line no-conso   le
  }

  changeGrid(id) {
    const { scenarios } = this.state;
    const result = scenarios.find(scenario => scenario.id === id);
    this.setState({ newGrid: result, scenarioMode: false });
  }

  changeGridByLink() {
    const { scenarios, search } = this.state;
    const result = scenarios.find(scenario => scenario.link === search);
    this.setState({ newGrid: result, scenarioMode: false });
  }

  componentDidMount() {
    this.getScenarios();
  }

  setScenarioName(evt) {
    this.setState({ scenarioName: evt.target.value });
  }
  setAuthorName(evt) {
    this.setState({ authorName: evt.target.value });
  }
  handleSubmit(evt) {
    console.log('handling submit');
    evt.preventDefault(); // prevent page reload
    // change saveGrid state to activate callback in Sandbox.js
    this.setState({ saveGrid: true });
    // revert saveMode state
    this.setState({ saveMode: !this.state.saveMode });
  }
  unSaveGrid() {
    this.setState({ saveGrid: false });
  }
  handleExplore() {
    this.setState({ scenarioMode: true, start: false });
  }
  setSaveOption(evt) {
    this.setState({ savePrivacy: !this.state.savePrivacy });
  }
  render() {
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
    const { x, y, scenarios, scenarioMode } = this.state;

    const modal = (
      <Modal
        isOpen={this.state.saveMode}
        toggle={this.handleSave}
        centered
        backdrop
      >
        <ModalHeader>Save This Scenario</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="scenarioName">Scenario Name</Label>
              <br />
              <Input
                type="text"
                name="scenarioName"
                id="scenarioName"
                placeholder="Enter a name for the scenario"
                value={this.state.scenarioName}
                onChange={this.setScenarioName}
                invalid={!this.state.scenarioName}
              />
              <FormFeedback>Enter a title!</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="authorName">Author Name</Label>
              <br />
              <Input
                type="text"
                name="authorName"
                id="authorName"
                placeholder="Enter your name"
                value={this.state.authorName}
                onChange={this.setAuthorName}
                invalid={!this.state.authorName}
              />
              <FormFeedback>Enter a name!</FormFeedback>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Label for="Public">
            Public{' '}
            <input
              type="radio"
              value="Public"
              checked={this.state.savePrivacy}
              onChange={this.setSaveOption}
            />
          </Label>{' '}
          <Label for="Private">
            Private{' '}
            <input
              type="radio"
              value="Private"
              checked={!this.state.savePrivacy}
              onChange={this.setSaveOption}
            />
          </Label>{' '}
          <Button onClick={this.handleSubmit} type="submit">
            Submit
          </Button>
          <Button onClick={this.handleSave}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );

    const sandbox = (
      <Sandbox
        element={this.state.SelectedElement}
        size={this.state.BrushSize}
        fill={this.state.fill}
        filled={this.handleFill}
        step={this.state.step}
        unStep={this.handleStep}
        play={this.state.play}
        newGrid={this.state.newGrid}
        saveGrid={this.state.saveGrid}
        unSaveGrid={this.unSaveGrid}
        scenarioName={this.state.scenarioName}
        authorName={this.state.authorName}
        share={this.state.savePrivacy}
      />
    );

    const toolbox = (
      <Toolbox
        selected={this.selectElement}
        fill={this.state.fill}
        toFill={this.handleFill}
        step={this.handleStep}
        play={this.handlePlay}
        playState={this.state.play}
        saveMode={this.handleSave}
        saveModeState={this.state.saveMode}
      />
    );

    const inScenarioView = scenarioMode && scenarios !== undefined;
    let scenarioView = <p>Loading scenarios... </p>;
    if (scenarios) {
      const publicScenarios = scenarios.filter(scenario => {
        return scenario.share === undefined || scenario.share;
      });
      scenarioView = publicScenarios.map(scenario => (
        <p key={scenario.id}>
          <button onClick={() => this.changeGrid(scenario.id)}>
            {scenario.title} by {scenario.author}
          </button>
        </p>
      ));
    }

    if (this.state.start) {
      return (
        <Div className="App">
          <GlobalStyle mode="start" />
          <img src={logo} alt="elemental automata" />{' '}
          <Start onClick={this.handleStart}>START</Start>
          <Start onClick={this.handleExplore}>EXPLORE</Start>
        </Div>
      );
    } else if (inScenarioView) {
      return (
        <Div className="App">
          <GlobalStyle mode="scenario" />
          <Form>
            <FormGroup>
              <Input
                id="search"
                value={this.state.search}
                onChange={this.handleSearch}
              />{' '}
              <Button onClick={this.changeGridByLink} />
            </FormGroup>
          </Form>
          {scenarioView}
        </Div>
      );
    } else {
      return (
        <div className="App">
          <GlobalStyle />
          {modal}
          {sandbox}
          {toolbox}
        </div>
      );
    }
  }
}

export default App;
