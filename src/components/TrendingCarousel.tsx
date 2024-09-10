import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { IMovieBasic, ICarouselProps } from '../types';
import { extractBasicMovieData } from '../utils/api_utils'
import { options_get } from '../utils/api_constants';
import './styles/TrendingCarousel.css';

export default function TrendingCarousel(props: ICarouselProps) {
    const [movies, setMovies] = useState<IMovieBasic[]>([]);

    useEffect(() => {

        const fetchTrendingMovies = async () => {
            try {
              const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options_get);
              if (!response.ok) {
                throw new Error("Failed to fetch trending movie data.");
              }
              const result = await response.json();
              const basic_movies_data: IMovieBasic[] = extractBasicMovieData(result["results"]);
              setMovies(basic_movies_data);

            } catch (error: unknown) {
                const err = error as Error; // should check other types of errors
                console.log(err.message);
            }
        }
        fetchTrendingMovies();
    }, [])

    return (
        <Carousel className="trending-carousel" pause="hover">
            {movies.map(movie => {
                return (
                    <Carousel.Item key={movie.id}>
                        <div className="mx-auto trending-carousel__item-content no-select">
                            <div className="trending-carousel__backdrop-container">
                                <img className="trending-carousel__backdrop" src={props.image_server_base_url + props.backdrop_size + movie.backdrop_path}/>
                            </div>
                            <img className="trending-carousel__poster" src={props.image_server_base_url + props.poster_size + movie.poster_path} draggable="false"/>
                        
                            <div className="trending-carousel__text-container">
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </Carousel.Item>
                )
            })}
        </Carousel>
      );
}