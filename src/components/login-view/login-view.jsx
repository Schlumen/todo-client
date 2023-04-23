import "./login-style.css"
import { Link } from "react-router-dom";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            password
        };

        fetch("https://todoapp-afqp.onrender.com/api/users/login-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    localStorage.setItem("user", JSON.stringify(data.username));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.username, data.token);
                    window.location.replace("/");
                } else if (!data.success) {
                    alert(data.message)
                } else {
                    alert("Login failed");
                }
            })
            .catch(e => {
                alert("Somethig went wrong");
            });
    }

    return (
        <div className="login-wrapper">
            <div className="login-form-wrapper">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <br />
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <br />
                    <input
                        type="submit"
                        value="Log in"
                        id="login-button" />
                    <br />
                    <Link to="/signup">Don't have an account? Sing up here.</Link>
                </form>
            </div>
        </div>
    );
}