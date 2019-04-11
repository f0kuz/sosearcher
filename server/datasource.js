const { RESTDataSource } = require('apollo-datasource-rest');

class StackOverflowAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.stackexchange.com/2.2/';
    this.requestParams = {
      order: 'desc',
      sort: 'activity',
      site: 'stackoverflow',
      filter: 'withbody',
      intitle: 'graphql'
    }
  }

  async getIssues(issue) {
    const result = await this.get('search', {
      'intitle': issue,
      ...this.requestParams
    });

    return result.items;
  }

  async getAnswer(acceptedAnswerId) {
    const result = await this.get('answers', {
      acceptedAnswerId
    })

    return result.items
  }
}

module.exports = StackOverflowAPI
