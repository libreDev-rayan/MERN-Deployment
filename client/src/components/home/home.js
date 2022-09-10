import React from 'react'
import "./home.css"
import { useState, useEffect } from 'react'
import {useNavigate, Link} from "react-router-dom";
import  axios  from 'axios'

export const Home = (props) => {
    const navigate = useNavigate()

    let[userinfo,setUserinfo] = useState({})

    let [movies, setMovies] =  useState([])

    const ratingAverage = (arr)=>{
        let sum = 0;
        arr.forEach(element => {
            sum = sum + Number(element.rating)
        });
        let avg = sum/arr.length
        return avg.toFixed(1)
    };

    const moviesornot = ()=>{
        if(movies.length === 0){
            return(<div>
                <h1 className='nomovies'><span>There isn't any movie posted yet </span>, but you can add a new one </h1>
            </div>)
        }
        else{
            return(
                <div className='tablecontainer'>
                    <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Movie Title</th>
                        <th scope="col">Avg. Rating</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map((movie,index)=>{
                                return(
                                    <tr key={index}>
                                        <td key={movie.title+index}>
                                            {movie.title}
                                        </td>
                                        <td key={movie.title+index+"2"}>
                                            {ratingAverage(movie.reviews)}
                                        </td>
                                        <td key={movie.title+index+"3"}>
                                            <Link className='btn bg-info mx-2 ' to={"/movies/" + movie._id}>Read Reviews</Link>
                                        <Link className='btn btn-success mx-2' to={"/movies/" + movie._id + "/review"}>Write a Review</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
            )
        }
    };

    useEffect(()=>{
        setUserinfo(JSON.parse(sessionStorage.getItem('userinfo')) )
        secroute()

        axios.get("http://localhost:8080/api/movies/getall")
        .then(data=>{
            setMovies(data.data)
            
        })
        .catch(err=>{
            console.log(err);
        })

    },[])


    const secroute = ()=>{
        let usinfo = JSON.parse(sessionStorage.getItem('userinfo'))
        if(!usinfo){
            navigate("/")
        }
    }

    const logout = ()=>{
        sessionStorage.clear()
        navigate("/")
    }


    return(
        <div>
            <div className='home-nav'>
                <h1>Moldy Tomatoes</h1>
                <button className='btn btn-danger' type='button' onClick={logout}>Log Out</button>
            </div>
            <div className='home-main'>
                <div className='main-top'>
                    <h1>Movie List</h1>
                    <Link className='btn btn-primary' to={"/movies/new"}>+ Add New Movie</Link>
                </div>
                <div>
                    {moviesornot()}
                </div>
            </div>
        </div>
    )
}

export default Home