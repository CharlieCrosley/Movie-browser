import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IconContext } from "react-icons";
import { GoSearch } from "react-icons/go";
import { IMovieBasic } from '../types';
import { extractBasicMovieData } from '../utils/api_utils'
import { options_get } from '../utils/api_constants';
import './styles/SearchBar.css'

export default function SearchBar() {

	const [bToggleSearchBar, setToggleSearchBar] = useState<boolean>(false);
	const [bDisplaySearchResults, setDisplaySearchResults] = useState<boolean>(false);
	const [searchInput, setSearchInput] = useState<string>("");
	const [searchResults, setSearchResults] = useState<IMovieBasic[]>([]);
	
	useEffect(() => {
        if (searchInput) {
            const fetchMoviesByTitle = async () => {
                try {
                    const response = await fetch('https://api.themoviedb.org/3/search/movie?query='+searchInput+'&include_adult=false&language=en-US&page=1', options_get);
                    if (!response.ok) {
                        throw new Error("Failed to fetch trending movie data by genre.");
                    }
                    const result = await response.json();
                    const basic_movies_data: IMovieBasic[] = extractBasicMovieData(result["results"], 5);
                    setSearchResults(basic_movies_data);
    
                } catch (error: unknown) {
                    const err = error as Error; // should check other types of errors
                    console.log(err.message);
                }
            }
            fetchMoviesByTitle();
        }
        else
            setSearchResults([]) // close search results when input is empty
	}, [searchInput])

	const onSearchInputChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value)
		setDisplaySearchResults(true) // display search results when there is an input
	})

	const toggleShowSearchResults = (() => {
		// Clear suggestions if input is empty
		if (!searchInput) {
			setSearchResults([])
			setDisplaySearchResults(false)
		} 
		else {
			// Delay because clicking search result unfocuses search bar and hides result list
			if (bDisplaySearchResults) {
				setDisplaySearchResults(!bDisplaySearchResults)
			} else {
				setDisplaySearchResults(!bDisplaySearchResults)
			}
		}
	})

	return (
        <>
            {bToggleSearchBar 
            ? 
            <>
                <IconContext.Provider value={{ size: "2em", color: "white", className: "search-bar__icon" }}>
                        <RxCross2 onClick={() => setToggleSearchBar(!bToggleSearchBar)}/>
                </IconContext.Provider>
                <div className="search-bar_container">
                        <IconContext.Provider value={{ size: "1.5em", color: "#cacaca", className: "search-bar__icon-in-bar" }}>
                            <GoSearch onClick={() => setToggleSearchBar(!bToggleSearchBar)}/>
                        </IconContext.Provider>
                        <input className="search-bar__input" 
                            type="text" placeholder="Search for a movie or tv show..." 
                            onChange={onSearchInputChange}
                            value={searchInput} 
                            onBlur={toggleShowSearchResults} 
                            onFocus={toggleShowSearchResults}
                        />
                </div>
                {bDisplaySearchResults && 
                        <div className="search-results__container">
                                {searchResults.map((movie, index) => {
                                return (
                                    <div className="search-results__row" key={index}>
                                        {movie.title}
                                    </div>)
                                })}
                        </div>
                }
            </>
            : 
            <IconContext.Provider value={{ size: "2em", color: "white", className: "search-bar__icon" }}>
                <GoSearch onClick={() => setToggleSearchBar(!bToggleSearchBar)}/>
            </IconContext.Provider>
            }
        </>
	)
}