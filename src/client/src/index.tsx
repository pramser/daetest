// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

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
  faHome,
  faPollH,
  faTimes,
  faVial
);

const client = new ApolloClient({ uri: 'http://localhost:4000' });

// Entry-point for test-mon-client
ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
