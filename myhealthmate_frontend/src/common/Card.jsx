// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Card.css';

// const Card = ({ name, desc, buttons = [], to, color }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     if (to) {
//       navigate(to);
//     }
//   };

//   return (
//     <div
//       className="card"
//       style={{ cursor: "pointer", height: "250px", width: "350px" }}
//       onClick={handleCardClick} // Add click handler here
//     >
//       <div className="card-body" style={{ backgroundColor: color }}>
//         <h5 className="card-title">{name}</h5>
//         <p className="card-text">{desc}</p>
//         {buttons.length > 0 && (
//           <div className="d-flex flex-column">
//             {buttons.map((button, index) => (
//               <div key={index} className="mb-2">
//                 {button}
//               </div>
//             ))}
//           </div>
//         )}
//         {to && (
//           <button
//             className="btn btn-primary mt-3"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevents click from propagating to the card's onClick
//               navigate(to);
//             }}
//           >
//             Go to {name}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ name, desc, buttons = [], to, color, buttonLabel }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div
      className="card"
      style={{ cursor: "pointer", height: "250px", width: "350px" }}
      onClick={handleCardClick}
    >
      <div className="card-body" style={{ backgroundColor: color }}>
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{desc}</p>
        {buttons.length > 0 && (
          <div className="d-flex flex-column">
            {buttons.map((button, index) => (
              <div key={index} className="mb-2">
                {button}
              </div>
            ))}
          </div>
        )}
        {to && buttonLabel && (
          <button
            className="btn btn-primary mt-3"
            onClick={(e) => {
              e.stopPropagation(); // Prevents click from propagating to the card's onClick
              navigate(to);
            }}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
