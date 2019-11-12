import React from 'react';
import ReactDOM from 'react-dom';
import Provider from "react-redux/es/components/Provider";
import './index.scss';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import store from "./redux/store";


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));


