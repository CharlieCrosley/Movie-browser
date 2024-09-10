// Response from TMDb Movie fetch request
export interface IMovieResponse {
    backdrop_path: string,
    id: number,
    title: string,
    original_title: string,
    overview: string,
    poster_path: string,
    media_type: string,
    adult: boolean,
    original_language: string,
    genre_ids: number[],
    popularity: number,
    release_date: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

// Response from TMDb Genre fetch request
export interface IGenreResponse {
    id: number,
    name: string
}

// Interface containing only basic movie data
export interface IMovieBasic {
    id: number,
    title: string,
    overview: string,
    genre_ids: number[],
    backdrop_path: string
    poster_path: string
}

export interface ICarouselProps {
    image_server_base_url: string,
    backdrop_size: string
    poster_size: string
}

export interface IGenreCarouselProps  {
    image_server_base_url: string,
    poster_size: string,
    genre: IGenreResponse
}