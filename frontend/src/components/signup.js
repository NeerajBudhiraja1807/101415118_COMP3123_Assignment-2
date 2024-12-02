import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/v1/user/signup', { username, email, password });
            alert('Signup successful!');
            navigate('/');
        } catch (error) {
            alert('Signup failed.');
        }
    };

    // Inline styles
    const styles = {
        container: {
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        header: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            marginBottom: '15px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Signup</h1>
            <form onSubmit={handleSignup}>
                <div style={styles.formGroup}>
                    <input
                        type="text"
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <input
                        type="email"
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={styles.formGroup}>
                    <input
                        type="password"
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
