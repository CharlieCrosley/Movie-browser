import { IMovieBasic, IMovieResponse } from "../types";

/**
   * Return an array of movies with a simplified data structure.
   *
   * @param data - The list of movie data
   * @param n - The number of movies to return
   * @returns Array of movies with a simplified data structure
   */
export function extractBasicMovieData(data: IMovieResponse[], n: number = 10): IMovieBasic[] {
    const movies: IMovieBasic[] = [];
    data.slice(0,n).forEach(movie => { // get first 10 movies
        movies.push({
            id: movie["id"],
            title: movie["title"],
            overview: movie["overview"],
            genre_ids: movie["genre_ids"],
            backdrop_path: movie["backdrop_path"],
            poster_path: movie["poster_path"]
        });
    });
    return movies;
}


/**
   * Return a set of N unique indices, i, where 0 <= i <= max.
   *
   * @param max - Largest allowed index
   * @param n - The number samples
   * @returns Set of N unique indices
   */
export function getNRandomUniqueIndices(max: number, n: number): Set<number> {
    const samples = new Set<number>();
    // keep sampling until n values have been sampled
    while (n >= 0) {
        const x = Math.floor(Math.random() * max);
        if (!samples.has(x)) {
            samples.add(x);
            n--;
        }
    }
    return samples;
}