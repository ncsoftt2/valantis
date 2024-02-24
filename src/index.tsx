import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {Provider} from "react-redux";
import {store} from "src/store";
import {BrowserRouter} from "react-router-dom";
import '@fontsource-variable/montserrat';


import './style/index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        {/*<RouterProvider router={router}/>*/}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
