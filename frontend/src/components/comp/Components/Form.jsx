import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                <h2 style={{ marginTop: '40px' }}>{name}</h2>
                    <p>Blockchain Integration: Utilizing Ganache-CLI for a local blockchain environment and the Ethereum platform, we've implemented smart contracts to facilitate secure and efficient transaction operations.</p>
                </div>
                <div className="row">
                    <div className="col-lg-3 mt-lg-0 d-flex align-items-stretch"></div>
                    
                    <div className="col-lg-6 mt-lg-0 d-flex align-items-stretch">
                        <form onSubmit={handleSubmit} method="post" role="form" className="php-email-form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="email"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Loading...' : name}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Form;
