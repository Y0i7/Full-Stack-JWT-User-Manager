import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!formData.nombre.trim()) {
            setError('⚠ El nombre es requerido');
            return;
        }
        if (!isValidEmail(formData.email)) {
            setError('⚠ Correo electrónico inválido');
            return;
        }
        if (formData.password.length < 6) {
            setError('⚠ La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/autenticar/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.text();
            if (!response.ok) {
                throw new Error(data);
            }

            setMessage('🎉 ' + data);


            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(`⚠ ${err.message}`);
        }
    };

    return (
        <div className="auth-form max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Registro</h2>

            {/* Mensajes de éxito/error */}
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg text-center mb-3">
                    {message}
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-center mb-3">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    className="border p-2 rounded-md"
                />

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="border p-2 rounded-md"
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="border p-2 rounded-md"
                />

                <button
                    type="submit"
                    className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
