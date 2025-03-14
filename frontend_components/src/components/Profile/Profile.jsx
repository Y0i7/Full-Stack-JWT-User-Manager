import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
    const { token, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);

    const decodedToken = token ? jwtDecode(token) : null;
    const expirationTime = decodedToken?.exp * 1000;

    useEffect(() => {
        if (!expirationTime) return;

        const timer = setInterval(() => {
            const now = Date.now();
            const remaining = Math.floor((expirationTime - now) / 1000);
            setTimeLeft(remaining > 0 ? remaining : 0);

            if (remaining <= 0) logout();
        }, 1000);

        return () => clearInterval(timer);
    }, [expirationTime, logout]);

    // 🚀 Aquí agregamos la petición al backend para obtener los datos del usuario
    useEffect(() => {
        if (!token) return;

        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/usuarios/perfil', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al obtener datos del usuario");
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserProfile();
    }, [token]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="profile">
            <h2>Mi Perfil</h2>
            {error && <div className="error">{error}</div>}

            <div className="token-timer flex items-center justify-center gap-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
                <span className="text-lg font-semibold">Token expira en:</span>
                <strong className={`text-xl px-4 py-2 rounded-md ${timeLeft < 60 ? 'bg-red-500 text-white animate-pulse' : 'bg-red-300 text-red-900'}`}>
                    {formatTime(timeLeft)}
                </strong>
            </div>

            {userData ? (
                <table className="profile-data">
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <td>{userData.nombre}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{userData.email}</td>
                        </tr>
                        <tr>
                            <th>Rol</th>
                            <td>
                                {userData.authorities && userData.authorities.length > 0 ? (
                                    userData.authorities.map((role, index) => (
                                        <span key={index} className="role-badge">{role.authority}</span>
                                    ))
                                ) : (
                                    <span className="role-badge">Sin rol</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div>Cargando datos...</div>
            )}

            <button onClick={logout} className="logout-btn" id="logout-btn">Cerrar Sesión</button>
        </div>
    );
};

export default Profile;
