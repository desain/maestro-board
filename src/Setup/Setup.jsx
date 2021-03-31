// Setup window
import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp, faMinus, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Button, ButtonToolbar, DropdownButton, Form, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import './Setup.css';
import LanguagePicker from '../LanguagePicker/LanguagePicker'
import {useTranslation} from 'react-i18next';
import ThemePicker from "../ThemePicker/ThemePicker";
import ThemeEditor from "../ThemeEditor/ThemeEditor";
import {CUSTOM_THEME_NAME} from "../Constants";
import DropdownItem from "react-bootstrap/DropdownItem";

const resetGameDialog = (resetGameFunction, confirmationText) => {
  if (window.confirm(confirmationText)) {
    resetGameFunction();
  }
}

const PlayerEntry = (props) => {
  const {t} = useTranslation();
  const playerNumber = props.index + 1;
  const inputName = `player-name-${playerNumber}`;
  const title = <span className="setup-player-menu-title">{playerNumber}</span>;
  return (
      <InputGroup className="mb-2">
        <DropdownButton title={title} as={InputGroup.Prepend} variant="secondary">
          <DropdownItem onClick={() => props.removePlayer(props.index)}>
            <FontAwesomeIcon icon={faTrash} className="mr-2"/>
            {t('Delete')}
          </DropdownItem>
          <DropdownItem onClick={() => props.swapPlayers(props.index, props.index - 1)} disabled={props.index === 0}>
            <FontAwesomeIcon icon={faArrowUp} className="mr-2"/>
            {t('Move Up')}
          </DropdownItem>
          <DropdownItem onClick={() => props.swapPlayers(props.index, props.index + 1)} disabled={props.isLast}>
            <FontAwesomeIcon icon={faArrowDown} className="mr-2"/>
            {t('Move Down')}
          </DropdownItem>
        </DropdownButton>
        <FormLabel htmlFor={inputName} srOnly>{playerNumber}</FormLabel>
        <FormControl
            autoFocus
            name={inputName}
            type="text"
            value={props.name}
            placeholder={t("Type player name here")}
            onChange={(e) => props.namePlayer(props.index, e.target.value)}
            onKeyPress={event => {
              if (props.isLast && event.key === 'Enter') {
                props.addPlayer()
              }
            }}
        />
      </InputGroup>
  )
}

const Setup = (props) => {
  const {t} = useTranslation();
  const confirmationText = t('Are you sure you want to clear all player names and reset all scores to zero?');
  const playerList = props.players.map((player, playerIndex) => (
      <PlayerEntry
          key={player.key}
          name={player.name}
          index={playerIndex}
          namePlayer={props.namePlayer}
          removePlayer={props.removePlayer}
          addPlayer={props.addPlayer}
          swapPlayers={props.swapPlayers}
          isLast={playerIndex === props.players.length - 1}/>
  ));
  return (
      <Form className="setup-panel">
        <LanguagePicker language={props.lang} setLanguage={props.setLanguage}/>
        <ThemePicker theme={props.theme} setTheme={props.setTheme}/>
        <h3>{t("Player Setup")}</h3>
        <ButtonToolbar className="mb-2">
          <Button variant="secondary" className="btn-round mr-1" title="Remove player"
                  disabled={props.players.length === 1}
                  onClick={() => props.removePlayer()}>
            <FontAwesomeIcon icon={faMinus}/>
          </Button>
          <Button variant="secondary" className="btn-round mr-3" title="Add player" onClick={props.addPlayer}>
            <FontAwesomeIcon icon={faPlus}/>
          </Button>
          <Button variant="danger" title="Reset Game" onClick={() => resetGameDialog(props.resetGame, confirmationText)}>
            {t("Reset")}
          </Button>
          <Button variant="success" title="Start Maestro" onClick={props.startGame} className="ml-auto">{
            t("Start Maestro!")}
          </Button>
        </ButtonToolbar>
        {playerList}
        {props.theme === CUSTOM_THEME_NAME && <ThemeEditor theme={props.customTheme} setTheme={props.setCustomTheme}/>}
      </Form>
  )
}

Setup.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  namePlayer: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired
}

export default Setup;
