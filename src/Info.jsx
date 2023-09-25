import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import "./style/info_style.css";
import "bootstrap"
import waiting from "./img/waiting.gif"

export default function InfoMovie() {
    const { id } = useParams();
    const [movieDeets, setMovieDeets] = useState([])

    const header = {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
    }

    const loadingImg = useRef();

    function imagedisplay(e) {
        console.log("hai")
        e.target.style.backgroundColor = "yellow"

    }

    useEffect(() => {
        const a = "aaa"
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, header)
            .then(res => {
                if (res.status >= 200) {
                    setMovieDeets(res.data)
                    // console.log("success .. .. ..", movieDeets, " --- ", res.data)

                }
            })


    }, [])

    function DisplayDeets() {

        if (movieDeets.length !== 0) {
            console.log("deets  : ",movieDeets)
            const style = { backgroundImage: `url('https://image.tmdb.org/t/p/original/${movieDeets.backdrop_path}')` }
            return (
                <>
                    <div>{console.log(movieDeets.title)}</div>



                    <div className="wrapper" style={style} >

                        <div className='overlay-wrapper'>
                            <div className='movie-name nav'>
                                <div className="container">

                                    <div className="deets" id='movie-title'>
                                        <h1>{movieDeets.title}</h1>
                                    </div>

                                    <div className="rating-info">

                                        <span className='rate'>{movieDeets.vote_average}</span>
                                        <span className='rate'>{movieDeets.release_date}</span>
                                        <span className='rate'>{`${movieDeets.runtime}min`}</span>

                                    </div>
                                    <div className="summary">
                                        {movieDeets.overview}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                </>
            )
        } else {
            return (

                <>
                <div className='bodyBg nav'>
                <img src={waiting} alt=""/>
                </div>
                </>
            )
        }
    }
    return (
        <>
            {/* <div id='hai' onClick={imagedisplay}>Hai this is info : {id}</div> */}
            <DisplayDeets />
        </>
    )
}