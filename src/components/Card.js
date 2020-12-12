import { useState } from 'react';
import '../styles/Card.css';

function Card(props) {
  const {
    champion,
    setNewChampions,
  } = props;

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div 
      className={isClicked ? "Card clicked" : "Card"} 
      onClick={() => {
        setIsClicked(true);
        setNewChampions();
      }}
      onTransitionEnd={() => {
        setIsClicked(false);
      }}
    >
      <div className="imgFrame">
        <div className="imgContainer">
          <img className="cardImg" alt={champion.name} src={champion.image.default} />
          <div className="championName">
            {champion.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
