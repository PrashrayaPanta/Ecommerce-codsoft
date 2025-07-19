import React from "react";

const Star = ({ index, rating, setRating }) => {
  const handleClick = () => {
    setRating(index + 1);
  };

  console.log(rating);

  return (
    <div>
      <i
        className={`${
          rating >= index + 1 ? "fas fa-star" : "far fa-star"
        } text-green-800 text-5xl cursor-pointer`}
        onClick={() => handleClick(index + 1)}
      />
    </div>
  );
};

export default Star;
