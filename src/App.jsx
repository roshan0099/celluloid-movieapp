import React from "react";
import { Routes, Route } from "react-router-dom";
import InfoMovie from "./Info";
import Home from "./Home";

function App(){

  return(
    <>
     <Routes>
    <Route path="/" element = {<Home/>}></Route>
    <Route path="/info/:id" element = {<InfoMovie/>}></Route>
    </Routes>
    </>

  )
}

export default App;