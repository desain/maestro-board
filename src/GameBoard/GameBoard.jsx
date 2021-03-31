import React, {Component} from 'react';
import Player from '../Player/Player';
import {Col, Row} from 'react-bootstrap';
import './GameBoard.css';
import Setup from '../Setup/Setup';
import Help from '../Help/Help';
import i18n from '../i18n';
import {BUILTIN_THEMES, CUSTOM_THEME_NAME, SESSION_STORAGE_KEY} from '../Constants';
import {v4 as uuidv4} from "uuid";

const VERSION = '1.3.0'; // Keep in sync with version in package.json

export default class GameBoard extends Component {
  // Set up state for gameboard
  constructor(props) {
    super(props);
    this.state = this.initialSetup();

    // Get current session info, in case of reload
    if (sessionStorage.length > 0) {
      let persistentState = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (persistentState !== 'null') {
        this.state = {...this.state, ...JSON.parse(persistentState)};
      }
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    let persistentState = JSON.stringify(state);
    sessionStorage.setItem(SESSION_STORAGE_KEY, persistentState)
    return state;
  }

  componentDidMount = () => {
    document.addEventListener("keyup", this.keyPressHandler, false);
  }

  componentDidUpdate = () => {
    // console.log('[GameBoard.js] componentDidUpdate');
  }

  // Called by constructor, fills state and sets initial language
  initialSetup = () => {
    const currentLang = i18n.language;
    const players = [];
    for (let i = 1; i < 13; i++) {
      players.push(this.createPlayer());
    }
    return ({
      players,
      showControls: false,
      gameRunning: false,
      helpActive: true,
      language: currentLang,
      rounds: 4,
      justMoved: false,
      theme: 'default',
      customTheme: {
        name: 'Custom',
        title: 'Mystro',
        css: ''
      },
    });
  }

  keyPressHandler = (event) => {
    let currentRounds = this.state.rounds;
    let key = event.key
    switch (key) {
      case "?":
        // ? pressed -- help system
        this.setState({helpActive: !this.state.helpActive})
        break;
      case "ArrowRight":
      case "+":
        // RIGHT arrow key -- add one point to checked players
        this.setState({justMoved: true})
        this.givePointsToSelectedPlayers(1);
        break;
      case "ArrowLeft":
      case "-":
        // LEFT arrow key -- subtract one point from checked players
        this.setState({justMoved: true})
        this.givePointsToSelectedPlayers(-1);
        break;
      case "ArrowUp":
        // UP arrow key - add rounds to the board
        this.setState({rounds: currentRounds + 1});
        break;
      case "ArrowDown":
        // DOWN arrow key - add rounds to the board
        if (currentRounds > 4) this.setState({rounds: currentRounds - 1});
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        // Number key pressed -- add proper number of points and then uncheck everyone
        this.givePointsToSelectedPlayers(parseInt(key, 10));
        this.uncheckAll();
        break;
      case 'e':
        // E key pressed -- eliminate selected players. Also, nice.
        this.eliminateSelectedPlayers();
        this.uncheckAll();
        break;
      case 's':
        // S key pressed -- enter setup mode again
        this.setState({gameRunning: false});
        this.uncheckAll();
        break;
      case 'u':
        // U key pressed -- uncheck everyone
        this.uncheckAll();
        break;
      default:
        break;
    }
  }

  startGame = () => {
    this.setState({gameRunning: true, helpActive: false});
  }

  resetGame = () => {
    this.setState(this.initialSetup());
  }

  createPlayer = () => ({
    key: uuidv4(),
    name: '',
    score: 0,
    isEliminated: false,
    isSelected: false
  })

  addPlayer = () => {
    let players = [].concat(this.state.players);
    players.push(this.createPlayer());
    this.setState({players});
  }

  removePlayer = (playerIndex = this.state.players.length - 1) => {
    if (this.state.players.length > 1) {
      let newPlayerArray = [].concat(this.state.players);
      newPlayerArray.splice(playerIndex, 1);
      this.setState({players: newPlayerArray})
    }
  }

  swapPlayers = (index1, index2) => {
    if (index1 < 0 || index2 < 0 || index1 > this.state.players.length || index2 > this.state.players.length) {
      throw new Error(`Cannot swap players: index ${index1} or ${index2} out of range`);
    }
    const players = [].concat(this.state.players);
    const temp = players[index1];
    players[index1] = players[index2];
    players[index2] = temp;
    this.setState({players});
  }

  namePlayer = (playerIndex, name) => {
    const players = [].concat(this.state.players);
    players[playerIndex] = {...players[playerIndex], name};
    this.setState({players});
  }

  selectPlayer = (playerIndex) => {
    // First, did we just move another bunch of players? If so, uncheck all
    if (this.state.justMoved) {
      this.uncheckAll();
    }
    const players = [].concat(this.state.players);
    players[playerIndex] = {
      ...players[playerIndex],
      isEliminated: false,
      isSelected: !players[playerIndex].isSelected,
    };

    this.setState({players, justMoved: false});
  }

  givePointsToSelectedPlayers = (numPoints) => {
    let numRounds = this.state.rounds;
    let maxPoints = numRounds * 5;
    let addRound = false;

    const players = this.state.players.map((player) => {
      if (player.isSelected && !player.isEliminated) {
        player.score += numPoints;
        // If we have gone below zero, leave it at zero.
        if (player.score < 0) player.score = 0;
        // If this player's score has exceeded the maximum points for the number of rounds on the board, add a round.
        if (player.score > maxPoints) {
          addRound = true;
        }
      }
      return player;
    });
    this.setState({players, rounds: (addRound ? numRounds + 1 : numRounds)});
  }

  eliminateSelectedPlayers = () => {
    const players = this.state.players.map(player =>
        player.isSelected
            ? {...player, score: 0, isEliminated: true}
            : player);
    this.setState({players});
  }

  uncheckAll = () => {
    const players = this.state.players.map(player => ({...player, isSelected: false}));
    this.setState({players});
  }

  setLanguage = (language) => {
    i18n.changeLanguage(language);
    this.setState({language: language});
  }

  setTheme = (theme) => {
    this.setState({theme});
  }

  setCustomTheme = (customTheme) => {
    this.setState({customTheme});
  }

  getTheme = () => {
    if (this.state.theme === CUSTOM_THEME_NAME) {
      return this.state.customTheme;
    } else {
      return BUILTIN_THEMES[this.state.theme];
    }
  }

  render = () => (
      <Row className={`game-board rounds-${this.state.rounds}`}>
        <style>
          {this.getTheme().css}
        </style>
        <Col xs={1} className="title-container">
          <h1 className="maestro-title">{this.getTheme().title}</h1>
        </Col>
        <Col xs={11}>
          <div>
            <div className="number-markers">
              {Array(this.state.rounds).fill().map((_, i) =>
                  <span key={i} className="number-marker">{5 * (i + 1)}</span>)}
            </div>
            {this.state.players.map((player, playerIndex) => <Player
                key={player.key}
                player={player}
                index={playerIndex}
                selectPlayer={this.selectPlayer}
                rounds={this.state.rounds}
            />)}
          </div>
          {!this.state.gameRunning && <Setup
              players={this.state.players}
              namePlayer={this.namePlayer}
              addPlayer={this.addPlayer}
              removePlayer={this.removePlayer}
              swapPlayers={this.swapPlayers}
              startGame={this.startGame}
              resetGame={this.resetGame}
              language={this.state.language}
              setLanguage={this.setLanguage}
              theme={this.state.theme}
              setTheme={this.setTheme}
              customTheme={this.state.customTheme}
              setCustomTheme={this.setCustomTheme}
          />}
          {this.state.helpActive && <Help
              version={VERSION}
              closeHelp={() => this.setState({helpActive: false})}
          />}
        </Col>
      </Row>
  )
}
