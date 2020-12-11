import './styles/App.css';
import Card from './components/Card';

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

function getRandomNumber(lengthOfArray) {
  return Math.floor(Math.random() * lengthOfArray);
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

function App() {
  const champions = getChampions();

  return (
    <div className="App">
      <Card champion={champions[getRandomNumber(champions.length)]} />
      <Card champion={champions[getRandomNumber(champions.length)]} />
      <Card champion={champions[getRandomNumber(champions.length)]} />
      <Card champion={champions[getRandomNumber(champions.length)]} />
      <Card champion={champions[getRandomNumber(champions.length)]} />
    </div>
  );
}

export default App;
