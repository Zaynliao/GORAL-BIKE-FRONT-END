import { BsHeartFill, BsHeart } from 'react-icons/bs';

function Like(props) {
  return props.liked ? (
    <BsHeartFill
      color="red"
      className={props.className}
      size={props.width}
      onClick={() => {
        props.setLiked(!props.liked);
      }}
      style={{ cursor: 'pointer' }}
    />
  ) : (
    <BsHeart
      color="red"
      className={props.className}
      size={props.width}
      onClick={() => {
        props.setLiked(!props.liked);
      }}
      style={{ cursor: 'pointer' }}
    />
  );
}
// if (props.liked === false) {
//   return (
//     <BsHeart
//       color="red"
//       className={props.className}
//       size={props.width}
//       onClick={() => {
//         props.setLiked(!props.liked);
//       }}
//     />
//   );
// } else {
//   return (
//     <BsHeartFill
//       color="red"
//       className={props.className}
//       size={props.width}
//       onClick={() => {
//         props.setLiked(!props.liked);
//       }}
//     />
//   );
// }

// SELECT asdf WHERE

export default Like;
