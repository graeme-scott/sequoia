import React from 'react';

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: undefined,
    };

    this._handleSearch = this._handleSearch.bind(this);
  }

  _handleSearch(location, e) {
    e.preventDefault();

    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');

    if (searchContainer.classList.contains('open')) {
      if (searchInput.value !== '') {
        this.setState({
            location: searchInput.value
        });

        searchContainer.classList.remove('open');
        this.props._handleSearch(searchInput.value);

        setTimeout(function() {
          searchInput.value = '';
        }, 300);
      } else {
        searchContainer.classList.remove('open');
      }
    } else {
      searchContainer.classList.add('open');
    }
  }

  render() {
    return (
      <form className="search-container" onSubmit={(e) => this._handleSearch(this.state.location, e)}>
        <input className="search-input" />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </form>
    );
  }
}

export default LocationSearch;
