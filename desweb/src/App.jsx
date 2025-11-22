import {useState, useEffect} from "react";
import "./App.css";
import "./styles/Auth.css";
import Home from "./pages/Home";
import AuthPage from "./components/AuthPage";
import {isAuthenticated, logout} from "./api/authService";

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const user = params.get("user");

        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            window.history.replaceState({}, document.title, "/");
            setAuthenticated(true);
        } else {
            setAuthenticated(isAuthenticated());
        }
    }, []);

    const handleLogin = () => {
        setAuthenticated(true);
    };

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
    };

    if (authenticated) {
        return <Home onLogout={handleLogout}/>;
    }

    return <AuthPage onLogin={handleLogin}/>;
}

export default App;