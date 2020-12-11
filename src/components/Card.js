import '../styles/Card.css';

function Card(props) {
  const {
    champion,
  } = props;

  return (
    <div className="Card">
      <div className="imgFrame">
        <div className="imgContainer">
          <p>{champion.name}</p>
          <img className="cardImg" alt={champion.name} src={champion.image.default} />
          <p>{champion.blood}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
