import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import loadable from '@loadable/component';
// eslint-disable-next-line @emotion/no-vanilla
import { css } from '@emotion/css';

import './App.css';

import { Location } from 'history';
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
        <main
          className={css`
            margin: 0 auto;
            width: 80%;
          `}
        >
          <header className="App-header">
            <nav>
              <ul
                className={css`
                  display: flex;
                  padding: 10px;
                  font-size: 18px;
                  list-style: none;
                  & > li {
                    padding: 5px;
                  }
                `}
              >
                <li>
                  <Link to={(location: Location) => `/${location.search}`}>Main</Link>
                </li>
              </ul>
            </nav>
          </header>
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
