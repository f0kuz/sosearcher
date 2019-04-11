import {Component} from "react";
import {Query} from "react-apollo";
import {GET_ISSUES} from "../queries/queries";
import {createMarkup} from "../constants/constants";
import React from "react";

export class GetIssues extends Component {
  state = {
    detailsVisible: false,
    visibleId: null
  };

  showDetails = (id) => {
    this.setState(prevState => ({
      detailsVisible: !prevState.detailsVisible,
      visibleId: id
    }))
  };

  render() {
    return (
      <Query query={GET_ISSUES} variables={{intitle: this.props.phrase}}>
        {({loading, error, data}) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;

          return (
            <div>
              {!loading &&
              data.issues.map(issue => (
                <div key={issue.questionId}>
                  <h2 onClick={() => this.showDetails(issue.questionId)} dangerouslySetInnerHTML={createMarkup(issue.title)}/>
                  {this.state.detailsVisible && this.state.visibleId === issue.questionId ? (
                    <p dangerouslySetInnerHTML={createMarkup(issue.body)}/>
                  ) : null}
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
