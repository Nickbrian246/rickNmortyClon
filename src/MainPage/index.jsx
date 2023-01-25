import React, { useInsertionEffect } from "react";
import { NavBarMainPage } from "./header/NavBar";
import { CardOfCharacters } from "./CardOfCharacters";
import { useState, useRef, useCallback} from "react";
import useInfiniteScroll from "../customHooks/scrollInfinite/useInfinitrScroll";

const IndexMainPage = () => {
    const [page, setPage] = useState(1)

const {
    characters,
    isloading,
    isError,
    hasMore,
    } = useInfiniteScroll(page)

const observer = useRef()

const lastElementRef= useCallback( node => {
    if (isloading) return 
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver( entries => {
        if (entries [0].isIntersecting) {
            setPage(prevPageNumber => prevPageNumber +1)
        }
    })
    if (node ) observer.current.observe(node)
})
console.log(page);
  

    return(
        <>
        <nav style={{width:"100%"}}>
            <NavBarMainPage/>
        </nav>
        <div style={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            height:"auto",
            marginTop:"20px",
            flexWrap:"wrap",
            gap:"8px"
            }}>
                {characters.map((item,index) => { 
                    if (characters.length === index + 1) {
                        return <div ref={lastElementRef}  key={item.name}>
                                     <CardOfCharacters   item={item} key={item.name} />
                                </div>
                        
                    }
                    else {
                        return <CardOfCharacters  item={item} key={item.name} />
                    }
                }
                )
                 }
          <div>{isloading && 'is loading...'}</div>
          <div>{isError && 'error'}</div>
          <div>{ hasMore && 'error'}</div>
                 

                

        </div>      
    
        
        </>
    )
}
export {IndexMainPage};
