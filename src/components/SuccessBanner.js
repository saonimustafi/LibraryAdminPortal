// import React from 'react';
// import './SuccessBanner.css';

// function SuccessBanner({ message }) {
//   return (
//     <div id="success-banner" class="success-banner">
//         <p class="message-prop">Success message goes here</p>
//     </div>

//   );
// }


// import React, { useState, useEffect } from "react";

// function SuccessBanner({ message }) {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (message) {
//       setIsVisible(true);

//       // Hide the banner after 3 seconds
//       const timeoutId = setTimeout(() => {
//         setIsVisible(false);
//       }, 3000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [message]);

//   return (
//     <div
//       className="success-banner"
//       style={{ display: isVisible ? "block" : "none" }}
//     >
//       <p>{message}</p>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import "./SuccessBanner.css";

// function SuccessBanner({ message }) {
//   const [showBanner, setShowBanner] = useState(false);

//   useEffect(() => {
//     if (message) {
//       setShowBanner(true);
//       setTimeout(() => setShowBanner(false), 3000);
//     }
//   }, [message]);

//   return (
//     <div className={`success-banner ${showBanner ? "" : "hide"}`}>
//       <p>{message}</p>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import "./SuccessBanner.css";

// function SuccessBanner({ message }) {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//     //   this.setState({ showApproveSuccessBanner: false });
//     }, 3000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   return (
//     <div className={`success-banner ${isVisible ? "" : "hide"}`}>
//       <p>{message}</p>
//     </div>
//   );
// }

import React, { useState } from 'react';

function SuccessBanner(props) {
  const [isVisible, setIsVisible] = useState(false);

  function handleHide() {
    setIsVisible(false);
  }

  if (isVisible) {
    return (
      <div className="success-banner" onClick={handleHide}>
        <div className="success-icon">
          <i className="fa fa-check-circle"></i>
        </div>
        <div className="success-message">
          {props.message}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default SuccessBanner;