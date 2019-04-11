const { ApolloServer, gql } = require('apollo-server');
const StackOverflowAPI = require('./datasource')

const typeDefs = gql`
  type Issues {
    questionId: ID!,
    title: String!,
    body: String!,
    isAnswered: Boolean!,
    acceptedAnswerId: ID
  }
  
  type Answer {
    body: String!
  }
  
  type Query {
    issues(intitle: String): [Issues]
    answer(acceptedAnswerId: ID): Issues
  }
`;


const resolvers = {
  Query: {
    issues: (root, { intitle }, { dataSources }) => dataSources.stackOverflowAPI.getIssues(intitle),
    answer: (root, {acceptedAnswerId}, { dataSources }) => dataSources.stackOverflowAPI.getAnswer(acceptedAnswerId),
  },
  Issues: {
    questionId: ({ question_id }) => question_id,
    isAnswered: ({ is_answered }) => is_answered,
    acceptedAnswerId: ({ accepted_answer_id }) => accepted_answer_id,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    stackOverflowAPI: new StackOverflowAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
