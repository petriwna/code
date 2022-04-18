import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import './App.css';

import { store } from './store';

const About = loadable(() => import('./pages/About'));
const Articles = loadable(() => import('./pages/Articles'));
const Todos = loadable(() => import('./pages/Todos/Todos'));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>
          <header>
            <nav className="nav-container">
              <ul className="nav-list">
                <li>
                  <Link className="nav-list-item" to="/">
                    Todos
                  </Link>
                </li>
                <li>
                  <Link className="nav-list-item" to="/articles">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link className="nav-list-item" to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/articles" component={Articles} />
            <Route path="/" component={Todos} />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
