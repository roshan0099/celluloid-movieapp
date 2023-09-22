
import './style/genreDisplay_style.css';
import'./style/app_style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import  Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Genre(props){

    const searchVal = props.arg1
    const [searchMovieDeets, setSearchMovieDeets] = useState([])
    const [movieGenre, setMovieGenre] = useState('')
    const [movieStore, setMovieStore] = useState([])
    const API_KEY = "71ce448194fce252de3997ca31c501d0"
    const ACCESS_TOKEN = " eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNlNDQ4MTk0ZmNlMjUyZGUzOTk3Y2EzMWM1MDFkMCIsInN1YiI6IjVmOTU4M2VhMWZkMzZmMDA1ZTQ3NmNlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ff2sjz35zGL4-IaBjxuyGZmBbQioDlaMPD-1oWMp5jc"
    
    const header = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }

    const genre = {
        28 : "Action", 35 : "Comedy", 18 : "Drama" 
      }


      useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc&with_genres=${movieGenre}`,header)
        .then(res => {
            if(res.status >= 200){
                console.log("yess")
                console.log(res.data)
                setMovieStore(res.data.results)
            }else{
                console.log("something is wrong")
            }
        }).catch(err => {
            console.log("----error------")
        })


      },[movieGenre])



      useEffect(() => {

        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=+${searchVal}`)
        .then(res => {

            if(res.status >= 200 ){
                console.log("success")
                console.log(res.data)
                setSearchMovieDeets(res.data.results)
            
            }else{
                console.log("something went wrong")
            }
        }).catch(err => {console.log("---eerrr----",err)})
      },[searchVal])

      function SearchMovieDisplay(){


            if(searchMovieDeets.length !== 0){
                return(
                    
                    <Row>
                    {
                        searchMovieDeets.map(elm => {
                            console.log("this is elmm 0000 : ",elm.title)
                            return(<Col >
                            <div className='wrapper-poster'>
                            <div className='poster-size'>
                            <img src={`https://image.tmdb.org/t/p/original/${elm.poster_path}`} alt="" height={450} width={300}/>
                            </div>
                            </div>
                            {/* <div className='info-wrapper'>
                            <div className='title nav'>{elm.title}</div>
                            </div> */}
                            
                            </Col>
                        )})
                    }
                </Row>
                )
            }else{

                return(
                    <div>Wow emptyy....</div>
                )
            }

      }

      function MovieDisplay(){
            if(movieStore.length !== 0){
                return(
                    <Row>
                        {
                            movieStore.map(elm => {
                                
                                return(<Col >
                                <div className='wrapper-poster'>
                                <div className='poster-size'>
                                <img src={`https://image.tmdb.org/t/p/original/${elm.poster_path}`} alt="" height={450} width={300}/>
                                </div>

                                </div>
                                </Col>
                            )})
                        }
                    </Row>
                )
            }else
            return(<div>loading .. ..  ...</div>)
      }

      function genreSearch(e){
        setMovieGenre(e.target.id)
      }

    return(
        <>
        {console.log("arg 1 here : ",props.arg1)}
        <div className="bodyBg ">
        <Container className="nav genre-sel">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={movieGenre === "" ? "Drop down" : genre[movieGenre]}
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1" onClick={genreSearch} id="28">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" onClick={genreSearch} id="35">
                Comedy
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" onClick={genreSearch}id="18">Drama</NavDropdown.Item>
              <NavDropdown.Divider />
        
            </NavDropdown>
          </Nav>
  
        </Container>
        
      </div>
        <div className='bodyBg'>
        <Container>
            {searchVal=== '' ? <MovieDisplay></MovieDisplay> : <SearchMovieDisplay/> }
            
        </Container>
        </div>

        <Container>
       
        </Container>
      </>
    )
}