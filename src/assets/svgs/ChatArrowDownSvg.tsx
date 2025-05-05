import React from 'react'

// const ChatArrowDownSvg = () => {
//   return (
//     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M17 7L10 14L3 7" stroke="white" strokeWidth="2.4" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
// </svg>
//   )
// }
const ChatArrowDownSvg = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg style={style} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 7L10 14L3 7"
        stroke="white"
        strokeWidth="2.4"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style} // Apply the style prop to the path
      />
    </svg>
  );
};
export default ChatArrowDownSvg