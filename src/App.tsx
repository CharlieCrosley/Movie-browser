import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TrendingCarousel from './components/TrendingCarousel'
import GenreCarousel from './components/GenreCarousel'
import { IGenreResponse } from './types'
import { getNRandomUniqueIndices } from './utils/api_utils'
import { options_get } from './utils/api_constants';
import tmdblogo from './assets/tmdb-logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

export default function App() {
    const [image_server_base_url, setImageServerBaseUrl] = useState<string>("");
    const [backdrop_sizes, setBackdropSizes] = useState<string[]>([]);
    const [poster_sizes, setPosterSizes] = useState<string[]>([]);
    const [genres, setGenres] = useState<IGenreResponse[]>([]);

    useEffect(() => {

        const fetchAPIConfig = async () => {
            try {
              const response = await fetch('https://api.themoviedb.org/3/configuration', options_get);
              if (!response.ok) {
                throw new Error("Failed to fetch trending movie data.");
              }
              const result = await response.json();
              setImageServerBaseUrl(result["images"]["base_url"]);
              setBackdropSizes(result["images"]["backdrop_sizes"]);
              setPosterSizes(result["images"]["poster_sizes"]);

            } catch (error: unknown) {
                const err = error as Error; // should check other types of errors
                console.log(err.message);
            }
        }

        const fetchGenreIds = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options_get);
                if (!response.ok) {
                    throw new Error("Failed to fetch list of genres.");
                }
                const result = await response.json();
                // Randomly sample N genres to be displayed
                const genre_indices = getNRandomUniqueIndices(result.genres.length, 3);
                const sampled_genres: IGenreResponse[] = [];
                genre_indices.forEach((idx) => {
                    sampled_genres.push(result.genres[idx]);
                })
                setGenres(sampled_genres);

            } catch (error: unknown) {
                const err = error as Error; // should check other types of errors
                console.log(err.message);
            }
        }

        fetchAPIConfig();
        fetchGenreIds();
    }, [])

  return (
    <>
        <Navbar/>
        <TrendingCarousel 
        image_server_base_url={image_server_base_url} 
        backdrop_size={backdrop_sizes[3]}
        poster_size={poster_sizes[3]}
        />

        {genres.length > 0 && (
            genres.map(genre => {
                return (
                    <GenreCarousel key={genre.id}
                        image_server_base_url={image_server_base_url}
                        poster_size={poster_sizes[3]}
                        genre={genre}
                    />
                )
            }))
        }
      
        <Footer logo={tmdblogo} companyName="Movies .Inc" />
    </>
  )
}
