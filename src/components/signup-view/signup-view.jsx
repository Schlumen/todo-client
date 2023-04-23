import "./signup-style.css"
import { Link } from "react-router-dom";
import { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            name,
            email,
            password
        }

        fetch("https://todoapp-afqp.onrender.com/api/users/register-user", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.replace("/login");
                } else if (!data.success) {
                    alert(data.message);
                } else {
                    alert("Something went wrong");
                }
            });
    }

    return (
        <div className="signup-wrapper">
            <div className="register-form-wrapper">
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <br />
                    <label htmlFor="username">Username:</label>
                    <br />
                    <input
                        type="text"
                        id="username"
                        required
                        minLength="5"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        required
                        minLength="8"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <br />
                    <input
                        type="submit"
                        value="Sign up"
                        id="register-button" />
                    <br />
                    <Link to="/login">Already have an account? Log in here.</Link>
                </form>
            </div>
        </div>
    );
}