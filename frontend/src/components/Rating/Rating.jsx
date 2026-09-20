function Rating({ rating = 0, maxRating = 5 }) {
  return (
    <div className="rating">
      {Array.from({ length: maxRating }, (_, index) => {
        const starNumber = index + 1;

        return (
          <span key={starNumber}>
            {starNumber <= rating ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
}

export default Rating;