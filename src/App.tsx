import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import './App.css';

import { store } from './store';

const Main = loadable(() => import('./pages/Main/Main'));
const Editor = loadable(() => import('./pages/Editor/Editor'));

function NotFound() {
  return <h1>NotFound</h1>;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/editor/:noteId" component={Editor} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
