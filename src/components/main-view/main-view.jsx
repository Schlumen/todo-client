import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NotesView } from "../notes-view/notes-view";
import { useState } from "react";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            {user ?
                                <NotesView
                                    token={token}
                                    onLoggedOut={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }} />
                                : <Navigate to="/login" />
                            }
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <LoginView
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }} />
                        </>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <>
                            <SignupView />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}