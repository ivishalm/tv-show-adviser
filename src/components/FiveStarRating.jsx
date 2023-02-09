import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  const starList = [];
  console.log(Math.round(4.4));
  return (
    <div>
      <StarFill />
      <StarFill />
      <StarFill />
      <StarHalf />
      <StarEmpty />
    </div>
  );
}
