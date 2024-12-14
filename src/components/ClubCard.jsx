import { Link } from "react-router-dom";
import "./Cards.css";

function ClubCard(props) {
  const { clubData } = props;
  const clubLink = `/clubs/${clubData.id}`;

  return (
    <div className="card">
      <Link to={clubLink}>
        <img src={clubData.club_logo} />
        <h3>{clubData.club}</h3>
      </Link>
    </div>
  );
}

export default ClubCard;