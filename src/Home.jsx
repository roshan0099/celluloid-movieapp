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
import { Link } from 'react-router-dom';



export default function Home() {
  
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
                      <Link to={`/info/${res.id}`} >
                    <div className="rating-wrapper">
                      <div className="rating">{res.vote_average}</div>
                    </div>
                    <div className="wrap">
                      <img className="img-carousel" src={`https://image.tmdb.org/t/p/w500/${res.backdrop_path}`} alt="" />
                    </div>
                    <div className="movie-card"><div className="movie-title"><b>{res.title}</b></div>cc</div>
                    </Link>
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
  
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary paddingRemove bodyBg">
          <Container fluid className="px-5 py-3 nav bodyBg ">
            <Navbar.Brand href="#home" className="nav celluloid">Celluloid</Navbar.Brand>
  
            <Navbar className="justify-content-end" />
            <Navbar className="nav">
              <Nav>
                {/* <Nav.Link href="#deets" className="nav navbar-items">Random</Nav.Link> */}
                <Navbar.Text id="search" className="nav">
                  <input type="text" placeholder="search" id="movie-fetch" className="bodyBg"  onChange={fetchValue}  />
                </Navbar.Text>
              </Nav>
            </Navbar>
          </Container>
        </Navbar>
  
      <div className="bodyBg">
        <DisplayTopMovie />
      </div>
  
      <div id="genre-display" className=" bodyBg">
      <Genre arg1 = {searchMovie}/>
  
      </div>
      {/* <Button>halo</Button> */}
  
      <div class="footer">&copy;<span id="year" className="bodyBg"> </span><span> Celluloid. All rights reserved.</span></div>
      <div className="logo-bottom nav">
        <div className="logos nav"> Github </div>
        <div className="logos nav">Github </div>
        <div className="logos nav">Github </div>
      </div>
   
    </>
  
  
    
    )
  }