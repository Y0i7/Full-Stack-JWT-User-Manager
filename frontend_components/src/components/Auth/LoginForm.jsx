import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/autenticar/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (response.status === 404) {
                setError('Correo electrónico no registrado.');
                window.alert('Error: Correo electrónico no registrado.');
                return;
            }
            if (response.status === 401) {
                setError('Contraseña incorrecta.');
                window.alert('Error: Contraseña incorrecta.');
                return;
            }
            if (!response.ok) {
                throw new Error('Error en el inicio de sesión.');
            }

            const { token } = await response.json();
            login(token);


            window.alert('¡Inicio de sesión exitoso!');

            navigate('/perfil');
        } catch (err) {
            setError(err.message);
            window.alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="auth-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginForm;