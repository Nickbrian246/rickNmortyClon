import React, { useState } from "react";
import {BiAngry} from "react-icons/bi"
import { Input, } from '@mui/material';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const NavBarMainPage = (props) => {
    const [input,setInput] = useState("");
    const[filterByDead, setFilterByDead] = useState(false);
    const[filterByLive, setFilerBylive] = useState(false);
    const[filterByUnknown, setFilterByUnknown] = useState(false);
    const[stateFilter, setStateFilter] = useState("")

    const {
        setCharacterByBusqueda,
        setErrorByGetCharacterBInputSearch,
        setIsSearching,
        SetTellMeError,
    } = props;
    const BASEURL="https://rickandmortyapi.com/api";

    const handleInput = (event) => {
        setInput(event.target.value);
    }
    const handleClickBtn = (filterName) => {
        console.log(filterName,"filterName");
        if (filterName==="muerto") {
            return setFilterByDead(true)
        }
        if (filterName==="vivo") {
            setFilterByDead(false)
            return setFilerBylive(true)
        }
        if (filterName==="desconocido") {
            setFilerBylive(false)
            setFilterByDead(false)
            return setFilterByUnknown(true)
        }
        if (filterName==="todos") {
            return setFilterByDead(true)
        }
        
    }
    
    useEffect(()=> {
        if (input=="") return setIsSearching(false);  
        setIsSearching(true);

    fetch(`${BASEURL}/character/?name=${input}`)
    .then( response => {
        if (response.status!== 200) {
                SetTellMeError(response.status);
            return setErrorByGetCharacterBInputSearch(true)
        }
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
            <div>
            <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
        filtrar por status
        </InputLabel>
        <NativeSelect
        defaultValue={40}
        inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
        }}
        >
        <option 
        value={10}
        onClick={(()=> {handleClickBtn("vivo")})}
        >
            muerto
        </option>
        <option
        value={20}
        onClick={()=>{handleClickBtn("vivo")}}
        >
            vivo
        </option>
        <option 
        value={30}
        onClick={()=> {handleClickBtn("desconocido")}}
        >
            desconocido
        </option>
        <option 
        value={40}
        onClick={()=>{ handleClickBtn("todos")}}
        >
            todos
        </option>
        </NativeSelect>
        </FormControl>
    </Box>
            </div>



            
        </nav>
        
        </>
    )   
}

export {NavBarMainPage}