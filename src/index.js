import React from 'react';
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next';
import i18next from './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import GameBoard from './GameBoard/GameBoard';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <GameBoard/>
      </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
