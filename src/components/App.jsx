import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import client from '../client';
import './App.css';
import PeopleList from './people-list/PeopleList';
import SearchBox from './SearchBox';
import { FORWARD } from './constants';
import SortBox from './SortBox';

export default class App extends Component {
  state = {
    page: 1,
    searchTerm: null,
    sortOrder: FORWARD,
  };

  constructor(props) {
    super(props);

    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
    this.setPageNumber = this.setPageNumber.bind(this);
  }

  setSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  setSortOrder(order) {
    this.setState({ sortOrder: order });
  }

  setPageNumber(number) {
    this.setState({ page: number });
  }

  render() {
    const { page, searchTerm, sortOrder } = this.state;
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <div className="appHeader">
            <div className="search-container">
              <SearchBox setSearchTerm={this.setSearchTerm} />
            </div>
            <div />
            <div className="sort-order-container">
              <SortBox setSort={this.setSortOrder} />
            </div>
          </div>
          <hr />
          <div className="peopleList">
            <PeopleList
              searchTerm={searchTerm}
              page={page}
              sortOrder={sortOrder}
              setPageNumber={this.setPageNumber}
            />
          </div>
        </React.Fragment>
      </ApolloProvider>
    );
  }
}
