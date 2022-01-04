import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let apolloClient;

const httpLink = new HttpLink({
  uri: "http://ec2-35-180-207-47.eu-west-3.compute.amazonaws.com:8080/graphql",
  credentials: "same-origin",
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default class AbstractService {
  constructor() {
    if (this.constructor === AbstractService) {
      throw new TypeError(
        'Abstract class "AbstractService" cannot be instantiated directly'
      );
    }
  }

  initializeApollo() {
    const _apolloClient = apolloClient ?? createApolloClient();
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
  }

  doRequest(request, variables = null) {
    const client = this.initializeApollo();
    return new Promise((resolve, reject) => {
      client
        .query({
          query: request,
          variables: variables ? variables : {},
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  doMutation(request, variables = null) {
    const client = this.initializeApollo();
    return new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: request,
          variables: variables ? variables : {},
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
