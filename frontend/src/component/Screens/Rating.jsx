import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
  return (
    <div className="my-1">
      {value > 1 ? (
        <FaStar style={{ color }} />
      ) : value > 0.5 ? (
        <FaStarHalfAlt style={{ color }} />
      ) : (
        <FaRegStar style={{ color }} />
      )}
      {value > 2 ? (
        <FaStar style={{ color }} />
      ) : value > 1.5 ? (
        <FaStarHalfAlt style={{ color }} />
      ) : (
        <FaRegStar style={{ color }} />
      )}
      {value > 3 ? (
        <FaStar style={{ color }} />
      ) : value > 2.5 ? (
        <FaStarHalfAlt style={{ color }} />
      ) : (
        <FaRegStar style={{ color }} />
      )}
      {value > 4 ? (
        <FaStar style={{ color }} />
      ) : value > 3.5 ? (
        <FaStarHalfAlt style={{ color }} />
      ) : (
        <FaRegStar style={{ color }} />
      )}
      {value >= 5 ? (
        <FaStar style={{ color }} />
      ) : value > 4.5 ? (
        <FaStarHalfAlt style={{ color }} />
      ) : (
        <FaRegStar style={{ color }} />
      )}
      <span> {text} Reviews</span>
    </div>
  );
};
export default Rating;

Rating.defaultProps = {
  color: "gold",
};
