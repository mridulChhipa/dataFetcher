import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ userid: '', password: '' });
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await api.post('/api/login', credentials);
            setUserData(data);
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Check credentials.');
        }
    };

    const handleLogout = () => {
        setUserData(null);
        setCredentials({ userid: '', password: '' });
    };

    return (
        <div className="container">
            {!userData ? (
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 style={{ margin: '20px 0' }}>Login</h2>
                    <input
                        type="text"
                        value={credentials.userid}
                        onChange={(e) => setCredentials({ ...credentials, userid: e.target.value })}
                        placeholder="User ID"
                        required
                        className='form-input'
                    />
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        placeholder="Password"
                        className='form-input'
                        required
                    />
                    <button type="submit" className='btn'>Sign In</button>
                    {error && <p className="error">{error}</p>}
                </form>
            ) : (
                <div>
                    <button
                        onClick={handleLogout}
                        className='btn btn-success'
                        style={{ marginBottom: '20px' }}
                    >
                        Fetch Again
                    </button>

                    {userData?.role === 'admin' && (
                        <div className="admin-view">
                            <table>
                                <thead>
                                    <tr>
                                        <th>userid</th>
                                        <th>password_hash</th>
                                        <th>role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.data.map(user => (
                                        <tr key={user.userid}>
                                            <td>{user.userid}</td>
                                            <td>{user.password_hash}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {userData?.role === 'basic' && (
                        <div className="basic-view">
                            <table>
                                <thead>
                                    <tr>
                                        <th>userid</th>
                                        <th>password_hash</th>
                                        <th>role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{userData.data.userid}</td>
                                        <td>{userData.data.password_hash}</td>
                                        <td>{userData.data.role}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LoginForm;
