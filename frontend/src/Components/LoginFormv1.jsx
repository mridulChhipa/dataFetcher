import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
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

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2 style={{margin: '20px 0'}}>Login</h2>
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
                                <th>{userData.data.userid}</th>
                                <th>{userData.data.password_hash}</th>
                                <th>{userData.data.role}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
