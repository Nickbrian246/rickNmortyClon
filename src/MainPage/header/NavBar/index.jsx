import React from "react";
import {BiAngry} from "react-icons/bi"
import { Input } from '@mui/material';

const NavBarMainPage = () => {
    return (
        <>
        <nav style={{
            width:"100%",
            height:"fit-content",
            display:"flex",
            justifyContent:"space-around",
            borderBottom:"1px solid black"
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
                placeholder="search your character"/>
            </div>



            
        </nav>
        
        </>
    )   
}

export {NavBarMainPage}