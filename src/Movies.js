import React, { Component } from "react";
import "./Movies.css";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      searchQuery: "",
    };
  }

  componentDidMount() {
    fetch("https://www.omdbapi.com/?apikey=45f0782a&s=war")
      .then((response) => response.json())
      .then((data) => this.setState({ data }))
      .catch((error) => console.error(error));
  }

  handleSearchInput = (event) => {
    const { value } = event.target;
    this.setState({ searchQuery: value });
  };

  render() {
    const { Search = [] } = this.state.data;
    const { searchQuery } = this.state;

    const filteredSearchResults = Search.filter((movie) =>
      movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        <form className="search">
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchQuery}
            onChange={this.handleSearchInput}
          />
        </form>
        <div className="card-container">
          {filteredSearchResults.map((movie) => (
            <div className="card" key={movie.imdbID}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="card-image"
              />
              <div className="card-info">
                <h2 className="card-title">{movie.Title}</h2>
                <p className="card-details">Year: {movie.Year}</p>
                <p className="card-details">Type: {movie.Type}</p>
              </div>
              <div className="card-title-tooltip">{movie.Title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Movies;
