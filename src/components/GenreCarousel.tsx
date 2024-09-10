import { useEffect, useState } from 'react';
import { IMovieBasic, IGenreCarouselProps } from '../types';
import { extractBasicMovieData } from '../utils/api_utils'
import Carousel from "react-multi-carousel";
import { options_get } from '../utils/api_constants';
import "react-multi-carousel/lib/styles.css";
import './styles/GenreCarousel.css';


export default function GenreCarousel(props: IGenreCarouselProps) {
    const [movies, setMovies] = useState<IMovieBasic[]>([]);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=' + props.genre.id, options_get);
                if (!response.ok) {
                throw new Error("Failed to fetch trending movie data by genre.");
                }
                const result = await response.json();
                const basic_movies_data: IMovieBasic[] = extractBasicMovieData(result["results"], 15);
                setMovies(basic_movies_data);

            } catch (error: unknown) {
                const err = error as Error; // should check other types of errors
                console.log(err.message);
            }
        }
        fetchMoviesByGenre();
    }, [props.genre])

    // Dynamically change the number of items in the carousel when resizing window
    const responsive = {
        desktop_full: {
          breakpoint: { max: 3000, min: 1700 },
          items: 9,
          slidesToSlide: 3
        },
        size_2: {
          breakpoint: { max: 1700, min: 1500 },
          items: 8,
          slidesToSlide: 3
        },
        size_3: {
          breakpoint: { max: 1500, min: 1300 },
          items: 7,
          slidesToSlide: 3
        },
        size_4: {
          breakpoint: { max: 1300, min: 1100 },
          items: 6,
          slidesToSlide: 3
        },
        size_5: {
          breakpoint: { max: 1100, min: 900 },
          items: 5,
          slidesToSlide: 2
        },
        size_6: {
          breakpoint: { max: 950, min: 750 },
          items: 4,
          slidesToSlide: 1 
        },
        size_7: {
          breakpoint: { max: 750, min: 550 },
          items: 3,
          slidesToSlide: 1 
        },
        size_8: {
          breakpoint: { max: 550, min: 370 },
          items: 2,
          slidesToSlide: 1 
        },
        size_9: {
          breakpoint: { max: 370, min: 0 },
          items: 1,
          slidesToSlide: 1 
        }
    };

    return (
        <div className="genre-carousel__container no-select">
            <span className="genre-carousel__title">{props.genre.name}</span>
            <Carousel
            responsive={responsive}
            draggable={true}
            infinite
            >
                {movies.map(movie => {
                    return (
                        <div key={movie.id} className="genre-carousel__item-content">
                            <img className="genre-carousel__poster" src={props.image_server_base_url + props.poster_size + movie.poster_path} draggable="false"/>
                            <div className="genre-carousel__text-container">
                                <h3>{movie.title}</h3>
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        </div>
      );
}