import React, {useEffect, useState} from 'react';
import './FavoritePage.css';
import Axios from 'axios';
import {Popover} from 'antd';
import { IMAGE_URL } from '../../Config';

function FavoritePage(){

    const variable={
        userFrom: localStorage.getItem('userId')
    }
    const[FavoritedMovies, setFavoritedMovies]=useState([]);

    useEffect(()=>{
        fetchFavoritedMovies();
    },[])

    const fetchFavoritedMovies=()=>{
        Axios.post('/api/favorite/getFavoritedMovie', variable)
         .then(response=>{
             if(response.data.success)
             {
                 setFavoritedMovies(response.data.favorites);
             }
             else
             {
                 alert('Failed to get favorite movie')
             }
        })
    }

    const onClickRemove=(movieId)=>{

         const variable={
             movieId: movieId,
             userFrom: localStorage.getItem('userId')
         }
                 Axios.post('/api/favorite/removeFromFavorite', variable)
                   .then(response=>{
                        if(response.data.success){
                            fetchFavoritedMovies();
                        }
                        else{
                            alert('Failed to remove from favorite');
                        }
                   })
    }

    const renderTableBody=FavoritedMovies.map((movie, index)=>{

        const imagecontent=(
            <div>
                {movie.movieImage?
                <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="movieImage"/>
                : "No Image"
                }
            </div>
        )

        return(
            <tr>
                <Popover content={imagecontent} title={`${movie.movieTitle}`}>
                <td>{movie.movieTitle}</td>
                </Popover>
                <td>{movie.movieRunTime}</td>
                <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove</button></td>
            </tr>
        )
    })


    return(
        <div style={{width: '85%', margin: '3rem auto'}}>
         <h2>Favorite Movies by Me</h2>
         <hr/>

        <table>
            <thead>
                <tr>
                    <th>
                    Movie Title
                    </th>
                    <th>
                    Movie RunTime
                    </th>
                    <th>
                    Remove from Favorite
                    </th>
                </tr>
            </thead>
            <tbody>
             {renderTableBody}
            </tbody>
        </table>


        </div>
    )
}

export default FavoritePage;




