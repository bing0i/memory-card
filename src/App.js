import './styles/App.css';
import Card from './components/Card';
import { useState, useCallback } from 'react';

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
    dotArr = forwardSlashArr[3].split('.');
    underscoreArr = dotArr[0].split('_');
    championNames.push(capitalizeFirstLetter(underscoreArr[2]));
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
      blood: getRandomNumber(20),
    };
    champions.push(champion);
  });
  return champions;
}

function getUnusedNumbers(usedNumbers, champions, newArrayLength) {
  if ((usedNumbers.length >= champions.length) || (newArrayLength === 0)) {
    return [];
  }

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

      unusedNumbers[i] = getRandomNumber(champions.length);
    }

    isUnique = checkIfArrayIsUnique(unusedNumbers);
  }

  if (isDuplicate === newArrayLength) {
    let randomIndex = getRandomNumber(newArrayLength);
    let randomNumber = getRandomNumber(champions.length);
    while (usedNumbers.includes(randomNumber) && unusedNumbers.includes(randomNumber)) {
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
  const NUMBER_OF_CARDS = 5;
  const champions = getChampions();
  const unusedNumbers = getUnusedNumbers([], champions, NUMBER_OF_CARDS);
  const [usedIndex, setUsedIndex] = useState([...unusedNumbers]);
  const [randomChampions, setRandomChampions] = useState(unusedNumbers.map(unusedNumber => champions[unusedNumber]));

  const setNewChampions = useCallback(() => {
    const unusedNumbers = getUnusedNumbers(usedIndex, champions, NUMBER_OF_CARDS);

    if (unusedNumbers.length !== 0) {
      setUsedIndex(usedIndex.concat(
        unusedNumbers.filter(
          (unusedNumber) => !usedIndex.includes(unusedNumber)
      )));
      setRandomChampions(unusedNumbers.map(unusedNumber => champions[unusedNumber]));
    }
  }, [usedIndex, champions, NUMBER_OF_CARDS]);

  return (
    <div className="App">
      {randomChampions.map((randomChampion, index) => {
        return <Card key={index} champion={randomChampion} setNewChampions={setNewChampions} />
      })}
    </div>
  );
}

export default App;
