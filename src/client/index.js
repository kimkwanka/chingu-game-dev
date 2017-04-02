/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
// Only needed if using preact with React Dev Tools Chrome extension
import 'preact/devtools';
import App from './App';
import '../stylus/style.styl';

const render = (Component) => {
  ReactDOM.render(
    <Component />
  ,
document.getElementById('app'));
};

render(App);

// Handle hot module replacement
if ((process.env.NODE_ENV !== 'production') && module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
