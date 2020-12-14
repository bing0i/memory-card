import './styles/App.css';
import Card from './components/Card';
import { useState, useEffect } from 'react';

function importAllImages(r) {
  return r.keys().map(r);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getChampionNames(championImages) {
  let championNames = [];
  let forwardSlashArr;
  let dotArr;
  let underscoreArr;
  for (let i = 0; i < championImages.length; ++i) {
    forwardSlashArr = championImages[i].default.split('/');
    dotArr = forwardSlashArr[forwardSlashArr.length - 1].split('.');
    underscoreArr = dotArr[0].split('_');
    championNames.push(capitalizeFirstLetter(underscoreArr[underscoreArr.length - 1]));
  }
  return championNames;
}

function getRandomNumber(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

function getChampions() {
  const championImages = importAllImages(require.context('./images/', false, /\.(jpg)$/));
  const championNames = getChampionNames(championImages);
  const champions = [];
  championImages.forEach((championImage, index) => {
    let champion = {
      image: championImage,
      name: championNames[index],
      index: index,
    };
    champions.push(champion);
  });
  return champions;
}

function getUnusedNumbers(usedNumbers, champions, newArrayLength) {
  const unusedNumbers = new Array(newArrayLength);
  let isDuplicate;
  let isUnique = false;
  while (!isUnique) {
    isDuplicate = 0;
    for (let i = 0; i < newArrayLength; ++i) {
      let randomNumber = getRandomNumber(champions.length);
      if (usedNumbers.includes(randomNumber)) {
        isDuplicate += 1;
      }

      unusedNumbers[i] = randomNumber;
    }

    isUnique = checkIfArrayIsUnique(unusedNumbers);
  }

  if (isDuplicate === newArrayLength) {
    let randomIndex = getRandomNumber(newArrayLength);
    let randomNumber = getRandomNumber(champions.length);
    while (usedNumbers.includes(randomNumber)) {
      randomNumber = getRandomNumber(champions.length);
    }

    unusedNumbers[randomIndex] = randomNumber;
  }
  
  return unusedNumbers;
}

function checkIfArrayIsUnique(array) {
  return array.length === new Set(array).size;
}

function App() {
  const champions = getChampions();
  const MAX_SCORE = champions.length;
  const NUMBER_OF_CARDS = 5;
  const [randomChampions, setRandomChampions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [chosenIndex, setChosenIndex] = useState([]);
  const [isWin, setIsWin] = useState(false);

  function updateStatesWhenGameOver(isWinn) {
    if (isWinn) {
      setHighScore(score + 1)
    } else if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
    setChosenIndex([]);
    const unusedNumbers = getUnusedNumbers([], champions, NUMBER_OF_CARDS);
    setRandomChampions(unusedNumbers.map(unusedNumber => champions[unusedNumber]));
  }

  function updateStatesWhenGameContinuing(newChosenIndex) {
    if (score + 1 === MAX_SCORE) {
      setIsWin(true);
      updateStatesWhenGameOver(true);
      return;
    }
    setScore(score + 1);
    setChosenIndex(newChosenIndex);
  }

  function updateIsWin(value) {
    setIsWin(value);
  }

  function updateRandomChampions() {
    const unusedNumbers = getUnusedNumbers(chosenIndex, champions, NUMBER_OF_CARDS);
    setRandomChampions(unusedNumbers.map(unusedNumber => champions[unusedNumber]));
  }

  useEffect(updateRandomChampions, []);

  return (
    <div className="App">
      <div className="notifications">
        <p className="guideText">Try not to choose a champion twice!&emsp;</p>
        {isWin 
        ? <p className="winText"><i className="fas fa-glass-cheers"></i></p>
        : <p className="loseText"><i className="fas fa-laugh-wink"></i></p>}
      </div>
      <div className="scores">
        <span className="score">{`Score: ${score}`}</span>
        <span className="score">&emsp;&emsp;{`High score: ${highScore}`}</span>
        <span className="score">&emsp;&emsp;{`Max score: ${MAX_SCORE}`}</span>
      </div>
      <div className= "cards">
        {randomChampions.map((randomChampion, index) => {
          return (
            <Card 
              key={index} 
              champion={randomChampion}
              updateRandomChampions={updateRandomChampions}
              chosenIndex={chosenIndex}
              updateIsWin={updateIsWin}
              updateStatesWhenGameContinuing={updateStatesWhenGameContinuing}
              updateStatesWhenGameOver={updateStatesWhenGameOver}
            />)
        })}
      </div>
    </div>
  );
}

export default App;
