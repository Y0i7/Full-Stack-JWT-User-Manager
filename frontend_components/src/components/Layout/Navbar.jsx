import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { token, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">Control Usuarios</Link>
            <div className="nav-links">
                {token ? (
                    <span onClick={logout} className="nav-link logout-link">
                        Cerrar Sesión
                    </span>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/registro" className="nav-link">Registro</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
