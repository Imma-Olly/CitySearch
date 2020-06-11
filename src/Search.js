import React, { Component } from "react";
import "./Search.css";
import axios from 'axios'

class Search extends Component {
  state = {
    searchValue: "",
    cities: []
  };
  
  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = (searchInput) => {
    searchInput = searchInput.toUpperCase()
    const searchUrl = `https://ctp-zip-api.herokuapp.com/city/${searchInput}`;
    axios.get(searchUrl,)
      .then(response => {
        console.log(response.data);
        const msg = !response.data? 'no results' :'';
        this.setState({
          cities: response.data,
          message: msg,
          loading:false
        })
      })
      .catch(error => {
        if(error){
          this.setState({
            loading:false,
            message:'failed to get data'
          })
        }
      })
  }

  render() {
    return (
      <ul id="main">
        <h3>Enter a city</h3>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.cities ? (
          <ul id="cities-container">
            {this.state.cities.map((city, index) => (
              <li className="single-city" key={index}> 
              {city}             
              </li>
            ))}
          </ul>
        ) : (
          <p>zip codes in your city</p>
        )}
      </ul>
    );
  }
}

export default Search;