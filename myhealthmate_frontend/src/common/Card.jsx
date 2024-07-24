import React from "react";
import './Card.css';
import { useNavigate } from "react-router-dom";


export default function Card(props) {
    const { name, desc, buttons, to, img, color } = props;
    // console.log(button);
    let navigate = useNavigate();

    
    return (
        <div className="" style={{ cursor: "pointer",height:"250px",width:"350px" }} >
            <div class="card" style={{ width: "18rem" }} onClick={()=>navigate(to)}>
                <div class="card-body" style={{ backgroundColor: color }}>
                    <h5 class="card-title" >{name}</h5>
                    <p class="card-text">{desc}</p>
                    {buttons.length > 0 && buttons.map((button, index) => (
                        <button key={index}
                         className="btn btn-primary m-1" >{button}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}