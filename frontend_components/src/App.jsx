import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Profile from './components/Profile/Profile';  // Asegúrate de que sea import default
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './components/Home/Home';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro" element={<RegisterForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<Profile />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;