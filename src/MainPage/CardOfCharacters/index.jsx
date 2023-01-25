import React from "react";
import './indexStyleCard.css'

const CardOfCharacters = (props ) => {
    const {
        gender,
        image,
        name,
        status,
    } = props.item;
    

    return(
        <>
        <div className="Card-Container">
            <picture className="picture-container">
                <img className="picture" src={image}/>

            </picture> 
            <div className="text-container">
                <p className="title">nombre del personaje: {name}</p>
                <p className="status">status: {status} </p>
                <p className="gender">genero : {gender}</p>

            </div>
        </div>
        </>
    )
}
export {CardOfCharacters}
