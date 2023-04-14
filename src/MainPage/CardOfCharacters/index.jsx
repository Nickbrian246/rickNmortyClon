import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './indexStyleCard.css'

const CardOfCharacters = (props ) => {
    const[ isDead, setIsDead] = useState(false);
    const {
        gender,
        image,
        name,
        status,
    } = props.item;
useEffect(()=>{
    if (status==="Dead") {return setIsDead(true);}
}, [])
    
    

    return(
        <>
        <div className={ `Card-Container ${isDead && "Card-ContainerisDead"}`}>
            <picture className="picture-container">
                <img className="picture" src={image}/>

            </picture> 
            <div className="text-container">
                <p className="title">nombre del personaje: {name}</p>
                <p className={`status ${isDead && "statusisDead"}`}>status: {status} </p>
                <p className="gender">genero : {gender}</p>

            </div>
        </div>
        </>
    )
}
export {CardOfCharacters}
