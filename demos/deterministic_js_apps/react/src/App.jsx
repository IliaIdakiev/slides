import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { Machine } from './machine';
import UserList from './User/List';
import UserEntity from './User/Entity';

import * as protobuf from 'protobufjs';

const App = () => (
  <Provider store={store}>
    <Machine>
      <BrowserRouter>
        <div>
          <nav>
            <Link to="">User List</Link>
          </nav>
          <Route path="" exact component={UserList} />
          <Route path="/:id" component={UserEntity} />
        </div>
      </BrowserRouter>
    </Machine>
  </Provider>
);


export default App;