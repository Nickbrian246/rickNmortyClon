import React, { useState } from "react";
import {BiAngry} from "react-icons/bi"
import { Input, } from '@mui/material';
import { useEffect } from "react";

const NavBarMainPage = (props) => {
    const [input,setInput] = useState("");
    const {
        setCharacterByBusqueda,
        setErrorByGetCharacterBInputSearch,
        setIsSearching,
    } = props;
    const BASEURL="https://rickandmortyapi.com/api";

    const handleInput = (event) => {
        setInput(event.target.value);
    }
    
    useEffect(()=> {
        if (input=="") return setIsSearching(false);  
        setIsSearching(true);

    fetch(`${BASEURL}/character/?name=${input}`)
    .then( response => {
        if (response.status!== 200) { return setErrorByGetCharacterBInputSearch(true)}
        setErrorByGetCharacterBInputSearch(false);
        return response.json()
        })
    .then(response => {
        setCharacterByBusqueda(response.results);
    });

    },[input]);         

    return (
        <>
        <nav style={{
            width:"100%",
            height:"fit-content",
            display:"flex",
            justifyContent:"space-around",
            borderBottom:"1px solid black",
            background:'white'
            }}>

            <picture>
                <BiAngry
                style={{
                    fontSize:"40px",
                    }}/>
            </picture>
            <div >
                <p
                style={{
                    fontSize:"30px",
                    fontWeight:"bold",
                    margin:"0px",
                    }}>
                        The rick and morty api
                </p>
            </div>
            <div>
                <Input
                color="primary"
                placeholder="search your character"
                onChange={ handleInput}
                />
            </div>



            
        </nav>
        
        </>
    )   
}

export {NavBarMainPage}