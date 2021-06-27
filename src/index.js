import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from './App';
import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
