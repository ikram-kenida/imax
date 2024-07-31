export const renderStars = (
  numberOfStars: number,
  width: number = 22,
  height: number = 22
) => {
  let roundedNumber = Math.round(numberOfStars);

  const filledStars = Array(roundedNumber).fill(null);
  const emptyStars = Array(5 - roundedNumber).fill(null);

  return (
    <>
      {filledStars.map((_, index) => (
        <img
          key={index}
          src="/icons/star-2.svg"
          alt="star"
          width={width}
          height={height}
        />
      ))}
      {emptyStars.map((_, index) => (
        <img
          key={index}
          src="/icons/star-empty-2.svg"
          alt="star"
          width={width}
          height={height}
        />
      ))}
    </>
  );
};
