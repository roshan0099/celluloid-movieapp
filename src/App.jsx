import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap"
import './style/app_style.css'
import Genre from "./GenreDisplay";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown"
import { Routes, Route } from "react-router-dom";


function App() {
  
  const [searchMovie, setSearchMovie] = useState("")
  const [topMovies, setTopMovies] = useState([])


  function fetchValue(e){
      setSearchMovie(e.target.value)
      console.log("===> what you looking for : ",searchMovie)
  }
  //api deets
  const header = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  }

  const fetchVal = useRef("")

  function fetchSearchInfo(e){
    console.log(fetchVal.current.value)
    // setSearchMovie(e.target.value)

  }

  

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', header)
      .then(res => {

        if (res.status >= 200) {
          console.log("successss")
          console.log(res.data.results)

          setTopMovies(res.data.results)
        }

      }).catch(err => {
        console.log("error")
      })

  }, [])

  console.log("000")
  function DisplayTopMovie() {
    if (topMovies.length != 0) {
      console.log(topMovies[0].title)

      return (
        <div className="display-carousel overflow-override bodyBg">
          {
            topMovies.map((res, index) => {
              return (
                <div className="min-width bodyBg nav" key={index}>
                  <div className="rating-wrapper">
                    <div className="rating">{res.vote_average}</div>
                  </div>
                  <div className="wrap">
                    <img className="img-carousel" src={`https://image.tmdb.org/t/p/w500/${res.backdrop_path}`} alt="" />
                  </div>
                  <div className="movie-card"><div className="movie-title"><b>{res.title}</b></div>cc</div>
                </div>
              )
            })
          }
        </div>
      )
    } else {
      return (
        <div>fetchinng .. .. .</div>
      )
    }
  }


  function Header() {
    return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary paddingRemove bodyBg">
        <Container fluid className="px-5 py-3 nav bodyBg ">
          <Navbar.Brand href="#home" className="nav celluloid">Celluloid</Navbar.Brand>

          <Navbar className="justify-content-end" />
          <Navbar className="nav">
            <Nav>
              <Nav.Link href="#deets" className="nav navbar-items">Random</Nav.Link>
              <Navbar.Text id="search" className="nav">
                <input type="text" placeholder="search" id="movie-fetch"  onChange={fetchValue}  />
              </Navbar.Text>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
    );
  }

  return (<>

    {/* <Header></Header> */
    }

    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary paddingRemove bodyBg">
        <Container fluid className="px-5 py-3 nav bodyBg ">
          <Navbar.Brand href="#home" className="nav celluloid">Celluloid</Navbar.Brand>

          <Navbar className="justify-content-end" />
          <Navbar className="nav">
            <Nav>
              <Nav.Link href="#deets" className="nav navbar-items">Random</Nav.Link>
              <Navbar.Text id="search" className="nav">
                <input type="text" placeholder="search" id="movie-fetch"  onChange={fetchValue}  />
              </Navbar.Text>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>

    <div className="bodyBg">
      <DisplayTopMovie />
    </div>

    <Genre arg1 = {searchMovie}/>
    {/* <Button>halo</Button> */}

 

  </>)
}



// function App(){


//   const [valueChange, setValueChange] = useState("")
//   const [topMovies, setTopMovies] = useState([])
//   const [load, setLoad] = useState(false)
//   const [numb, setNumb] = useState([])
//   const [info, setInfo] = useState([])
//   var bookvals = []
//   console.log("ahi")
//   function editValue(e){
//       const newValue = e.target.value;
//       setValueChange(e.target.value)


//   }
//   const accessToken = " eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNlNDQ4MTk0ZmNlMjUyZGUzOTk3Y2EzMWM1MDFkMCIsInN1YiI6IjVmOTU4M2VhMWZkMzZmMDA1ZTQ3NmNlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ff2sjz35zGL4-IaBjxuyGZmBbQioDlaMPD-1oWMp5jc"
//   useEffect(() => {


//     const header = {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },


//     }

//     axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', header)
//     .then((res) => {
//       console.log("kk")
//       // console.log(res.data.results)
//       setTopMovies(res.data.results)

//     })

//   },[])


//   function HomepageDisplay(){
//     if(topMovies.length !== 0)
//     console.log("this is backdrop : ",topMovies[0].backdrop_path)
//     return(
//       <>
//       <div className="display-carousel overflow-override">

//         {topMovies.map(res => {
//           return(
//             <div className="min-width"><img src={`https://image.tmdb.org/t/p/w500/${res.backdrop_path}`} alt="" /></div>
//           )
//         })}
//       </div>
//       </>
//     )
//   }


//     useEffect(() => {

//       if(valueChange !== ""){

//         console.log("c")
//           axios.get(`https://api.themoviedb.org/3/search/movie?api_key=71ce448194fce252de3997ca31c501d0&query=${valueChange}`)
//          .then((res) => {
//           setLoad(false)
//           if(res.status >= 200){
//             console.log("success")
//             setLoad(true)
//             setInfo(res.data.results)

//           }else{
//             console.log("something went wrong")
//           }


//          })

//       }
//       else{
//         setInfo([])
//       }
//     },[valueChange])


//     function Display(){

//       if(info.length !== 0){
//         var enfo = Array.from(info)

//         // console.log(enfo," 000000 " ,info)
//         info.map(elm => console.log("this is  : ", elm.title))
//         return(
//           <div>
//             {

//             info.map(elm => {

//               return <h2>{elm.title}</h2>
//             })}
//           </div>
//         )
//       }else{
//         <h2>sheesh nth</h2>
//       }
//     }

//       function CheckIf(){
//         if(valueChange !== ''){
//         return(
//           <div>
//             {
//               info.length !==0 ? (!setLoad ? <div>loading.. ..</div> : info.map(elm => {

//                 return(
//                   <div>
//                     {elm.title}
//                   </div>
//                 )
//               })) : <div>wew empty</div>
//             }
//           </div>
//         )
//       }
//       else{
//         return (
//           <div>hai</div>
//         )
//       }
//     }
//   function changeVal(){
//     // console.log("change val")
//     setNumb((pre) => pre+1)
//     // console.log("new numb : = ", numb)
//   }
//   return(

//   <>
//   <input type="text" onChange={editValue} value={valueChange} />
//   <p>{valueChange}</p>
//   <button onClick={changeVal}>press {numb} </button>
//   {/* {<CheckIf/>} */}
//   {<HomepageDisplay/>}

//   </>
//   )
// }

export default App;