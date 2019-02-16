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
          <div className="header">
            <SearchBox setSearchTerm={this.setSearchTerm} />
            <SortBox setSort={this.setSortOrder} />
          </div>
          <PeopleList
            searchTerm={searchTerm}
            page={page}
            sortOrder={sortOrder}
            setPageNumber={this.setPageNumber}
          />
        </React.Fragment>
      </ApolloProvider>
    );
  }
}
