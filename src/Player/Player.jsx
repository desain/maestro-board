import React from 'react';
import {Col, Row} from 'react-bootstrap';
import './Player.scss';
import PropTypes from 'prop-types';
import ScaleText from "react-scale-text";

const Player = props => {
  const {rounds, index, player: {isEliminated, isSelected, name, score}, selectPlayer} = props;
  let cardCSS = 'player-card';
  if (isEliminated) cardCSS = 'player-card eliminated';
  else if (isSelected) cardCSS = 'player-card selected';
  let totalPoints = rounds * 5;
  const style = {
    marginLeft: 'calc((100%/' + totalPoints + '*' + score + ') - 200px)'
  }
  return (
      <Row>
        <Col xs={12} className="player-track">
          <div className="board-bg">
            <div className={cardCSS} style={style} onClick={() => selectPlayer(index)}>
              <div className="player-number">
                {index + 1}
              </div>
              <div className="player-name" title={score}>
                <ScaleText maxFontSize={24} minFontSize={10}>
                  {name}
                </ScaleText>
              </div>
            </div>
          </div>
        </Col>
      </Row>
  );
}

Player.propTypes = {
  player: PropTypes.object,
  index: PropTypes.number,
  selectPlayer: PropTypes.func,
  rounds: PropTypes.number
}

export default Player;
