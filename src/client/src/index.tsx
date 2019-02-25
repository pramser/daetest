// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

// CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import App from './app';

// Font-Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faCheck,
  faChevronRight,
  faChevronUp,
  faClock,
  faFile,
  faFileUpload,
  faHome,
  faPollH,
  faTimes,
  faVial
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCalendar,
  faCheck,
  faChevronRight,
  faChevronUp,
  faClock,
  faFile,
  faFileUpload,
  faHome,
  faPollH,
  faTimes,
  faVial
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    createUploadLink({ uri: 'http://localhost:4000' })
  ]),
  cache: new InMemoryCache()
});

// Entry-point for test-mon-client
ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
