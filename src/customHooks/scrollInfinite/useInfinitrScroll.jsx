import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'

export default function useInfiniteScroll(page) {
  const [characters, setCharacter] =useState([]);
  const [isloading, setIsLoading]= useState(true);
  const[isError,setisError] = useState(false)
  // el estado hasMore es para indicar que ya hemos llegado 
  // al final  de la pagination es decir 
  // ya no hay mas resultados que traer 
  const [hasMore, setHasMore] = useState(false)

  const BASEURL="https://rickandmortyapi.com/api";

  useEffect(()=> {
    setIsLoading(true);
    setisError(false);
  try {
    fetch(`${BASEURL}/character/?page=${page}`)
    .then( result => result.json())
    .then(result=> {
      // setCharacter(result.results)
      setCharacter(prevResults =>{
        return [...new Set([...prevResults, result.results])]
      })
      setHasMore(result.results > 0)
      setIsLoading(false)
    })
    
  } catch (error) {
    setisError(true)
  }
  },[page])

  return{
    characters,
    isloading,
    isError,
    hasMore,
  }
}