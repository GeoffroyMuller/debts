/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Routes, Route, Link } from "solid-app-router";

import './index.scss';
import App from './App';

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById('app') as HTMLElement
);
