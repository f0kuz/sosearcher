import {Component} from "react";
import {Query} from "react-apollo";
import React from "react";
import {GET_ANSWER} from "../queries/queries";

export class GetAnswer extends Component {
  render() {
    return (
      <Query query={GET_ANSWER}>
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;

          return (
            <div>
              {!loading && data.answer}
            </div>
          );
        }}
      </Query>
    );
  }
}
