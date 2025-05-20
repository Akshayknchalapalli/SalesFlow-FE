import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store.ts";
import { initAuth } from "./modules/auth/utils/initAuth.ts";

// Initialize authentication state
initAuth().then(() => {
  createRoot(document.getElementById("root")!).render(
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  );
});
