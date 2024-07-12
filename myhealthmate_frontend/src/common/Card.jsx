import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
    const { name,desc,button, to, img } = props;
    let navigate = useNavigate();
    return (
        <div className="" style={{ cursor: "pointer" }}>
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title" >{name}</h5>
                    <p class="card-text">{desc}</p>
                    <a href="#" class="btn btn-success">{button}</a>
                </div>
            </div>
        </div>
    )
}