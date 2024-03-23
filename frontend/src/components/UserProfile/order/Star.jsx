import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ star }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (<span key={index}>
{
    star>= index +1?(
        <FaStar className="icon"/>
    ): star >= number ? (
        <FaStarHalfAlt className="icon"/>
    ):(
        <AiOutlineStar className="empty-icon"/>
    )
}
    </span>);
  });

  return (
  <div className="stars">
    {ratingStar}
  </div>
    );
};

export default Star;
