import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <h1>Bienvenido</h1>
            <p>Por favor inicia sesión o regístrate para continuar</p>
            <div className="cta-buttons">
                <Link to="/login" className="btn">Login</Link>
                <Link to="/registro" className="btn">Registro</Link>
            </div>
        </div>
    );
};

export default Home;