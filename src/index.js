import "./style";
import React, { Component } from "react";
import { render } from "react-dom";
import { Results } from "./components/Results";
import { SearchBar } from "./components/SearchBar";
import { MusicPlayer } from "./components/MusicPlayer";

export default class App extends Component {
  state = {
    isUpdating: false,
    results: [],
    searchParams: {
      folder: "other",
      ext: "",
      filter: ""
    }
  };

  componentDidMount() {}

  handleSetMusic = (name, url) => e => {
    console.log(url, name);
    if (name.indexOf(".mp3") !== -1) {
      document
        .querySelector(".MusicPlayer")
        .setAttribute("style", "display:block");
      const audio = document.querySelector("audio");
      document.querySelector("audio source").src = url;
      audio.load();
      audio.play();
    }
  };
  handleSearchSubmit = e => {
    e.preventDefault();
    this.getFiles();
  };

  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      searchParams: {
        ...prevState.searchParams,
        [name]: value
      }
    }));
    console.log(this.state.searchParams);
  };

  getFiles = async () => {
    const { folder, ext, filter } = this.state.searchParams;

    document
      .querySelector(".MusicPlayer")
      .setAttribute("style", "display:none");
    this.setState({ isUpdating: true });
    try {
      const response = await fetch(
        `${BASE}?folder=${folder}&ext=${ext}&filter=${filter}`
      );
      const items = await response.json();
      this.setState({
        results: items || []
      });
      console.log(items);
    } catch (e) {
      this.setState({
        results: []
      });
      console.log(e);
    } finally {
      this.setState({ isUpdating: false });
    }
  };

  render(props, { isUpdating, results, searchParams }) {
    return (
      <div>
        <div class="container">
          <div class="row">
            <h1>Directory Search</h1>
          </div>
          <div>
            {" "}
            <SearchBar
              handleSearchChange={this.handleSearchChange}
              handleSearchSubmit={this.handleSearchSubmit}
              isUpdating={isUpdating}
              searchParams={searchParams}
            />
          </div>
          <hr />
          {!isUpdating && results?.files?.length > 0 && (
            <Results
              isUpdating={isUpdating}
              handleSetMusic={this.handleSetMusic}
              results={results}
              searchParams={searchParams}
            />
          )}
        </div>
        <MusicPlayer />
      </div>
    );
  }
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
