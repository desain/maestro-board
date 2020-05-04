import React from 'react';
import ScaleText from "react-scale-text";
import './PlayerCard.css';

// The white card containing the player's name and number
const playerCard = (props) => {
  let cardCSS = 'player-card';
  if (props.isEliminated) cardCSS = 'player-card eliminated';
  else if (props.isSelected) cardCSS = 'player-card selected';
  const style = {
    marginLeft: 'calc((100%/25*' + props.score + ') - 200px)'
  }
  return(
    <div className={cardCSS} style={style} onClick={(e) => props.checkPlayer(e, props.number)}>
      <div className="player-number">
        {props.number}
      </div>
      <div className="player-name"  title={props.score}>
        <ScaleText maxFontSize={24}>

            {props.name}
            </ScaleText>

          {/* <input
            className="player-name-field"
            placeholder="type name"
            type="text"
            value={props.name}
            onChange={(e) => props.namePlayer(e, props.number)}
          /> */}
        </div>

      {/* <span className="player-score">
        {props.score}
      </span> */}
    </div>
  )
}

export default playerCard;