import React from "react";
import { NavBarMainPage } from "./header/NavBar";
import { CardOfCharacters } from "./CardOfCharacters";
import { useState, useRef, useCallback } from "react";
import useInfiniteScroll from "../customHooks/scrollInfinite/useInfinitrScroll";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const IndexMainPage = () => {
    const [page, setPage] = useState(1);
    const [characterBybusqueda, setCharacterByBusqueda] = useState([]);
    const [errorByGetCharacterBInputSearch, setErrorByGetCharacterBInputSearch] = useState(false);
    const [isSearching, setIsSearching ] = useState(false);
    const observer = useRef();
    const {
        characters,
        isloading,
        isError,
        hasMore,        
    } = useInfiniteScroll(page);

    const skeleton = Array(20).fill(""); // arreglo donde cada posicion tendra el valor de ""

    const lastElementRef = useCallback(node => {
        if (isloading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            //el elemento  isIntersection me dice si el elmento esta dentro del vp
            if (entries[0].isIntersecting) {
                setPage(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    },[isloading]);

    // filtro para quitar los repetidos 
    let hash = {}
    const charactersArrayNoDuplicated = characters
    .flat()
    .filter(item => hash[item.id] ? false : hash[item.id] = true);

    return (
        <>
            <nav 
            style={{ 
            width: "100%",
            position:'sticky',
            top:'0px',
            }}>
                <NavBarMainPage 
                setCharacterByBusqueda={setCharacterByBusqueda}
                setErrorByGetCharacterBInputSearch={setErrorByGetCharacterBInputSearch}
                setIsSearching={setIsSearching}
                />
            </nav>
            <div 
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                height: "auto",
                marginTop: "20px",
                flexWrap: "wrap",
                gap: "8px",

            }}>

                {(isSearching=== false)&& (charactersArrayNoDuplicated.map((item, index) => {
                    if (charactersArrayNoDuplicated.length === index + 1) {
                        return <div ref={lastElementRef} key={item.id}>
                            <CardOfCharacters item={item} key={item.id} />
                        </div>

                    }
                    else {
                        return <CardOfCharacters item={item} key={item.id} />
                    }
                }
                ))}

                {(errorByGetCharacterBInputSearch === false)
                &&  (characterBybusqueda.map((item) => {
                    return <CardOfCharacters item={item} key={item.id} />
                })) }

                {(isloading) && (
                    <div style={{  display:"flex", flexWrap:"wrap", gap:"10px",justifyContent:"center"}}>
                        {skeleton.map((items) => {
                            return ( 
                            <Stack spacing={1}  >
                                {/* For variant="text", adjust the height via font-size */}
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                {/* For other variants, adjust the size with `width` and `height` */}
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="rectangular" width={401} height={60} />
                                <Skeleton variant="rounded" width={210} height={60} />
                            </Stack>)
                        })}
                    </div>
                )}
                <div>{isError && 'error'}</div>
                <div>{errorByGetCharacterBInputSearch && 'error'}</div>
                <div>{hasMore && 'error'}</div>




            </div>


        </>
    )
}
export { IndexMainPage };
