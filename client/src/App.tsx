import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import Header from "./components/Header";

function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <AppRouter />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
