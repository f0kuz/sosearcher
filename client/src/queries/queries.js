import {gql} from 'apollo-boost';

export const GET_ISSUES = gql`
  {
    issues {
      questionId,
      title,
      body,
      isAnswered,
      acceptedAnswerId
    }
  }
`;

export const GET_ANSWER = gql`
  {
    answer {
      body
    }
  }
`;
