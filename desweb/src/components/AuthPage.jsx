import {useState} from "react";
import {login, register} from "../api/authService";

const AuthPage = ({onLogin}) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginForm, setLoginForm] = useState({email: "", password: ""});
    const [registerForm, setRegisterForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: ""
    });
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);

    // Handlers Login
    const handleLoginChange = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value});
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        setLoginLoading(true);

        try {
            await login(loginForm);
            onLogin();
        } catch (err) {
            setLoginError(err.message);
        } finally {
            setLoginLoading(false);
        }
    };

    // Handlers Register
    const handleRegisterChange = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value});
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setRegisterError("");
        setRegisterSuccess("");

        if (registerForm.password !== registerForm.confirmPassword) {
            setRegisterError("Las contraseñas no coinciden");
            return;
        }

        if (registerForm.password.length < 6) {
            setRegisterError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setRegisterLoading(true);

        try {
            await register({
                nombre: registerForm.nombre,
                apellido: registerForm.apellido,
                email: registerForm.email,
                telefono: registerForm.telefono,
                password: registerForm.password
            });
            setRegisterSuccess("¡Registro exitoso! Ahora puedes iniciar sesión");
            setRegisterForm({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                password: "",
                confirmPassword: ""
            });
            setTimeout(() => {
                setShowLoginModal(true);
                setRegisterSuccess("");
            }, 1500);
        } catch (err) {
            setRegisterError(err.message);
        } finally {
            setRegisterLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="auth-page">
            {/* Header con botón de login */}
            <header className="auth-header">
                <div className="header-content">
                    <div className="logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">MiApp</span>
                    </div>
                    <button
                        className="btn-login-header"
                        onClick={() => setShowLoginModal(true)}
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </header>

            {/* Modal de Login */}
            {showLoginModal && (
                <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
                    <div className="modal-login" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={() => setShowLoginModal(false)}
                        >
                            ✕
                        </button>

                        <h2>¡Bienvenido!</h2>
                        <p className="modal-subtitle">Ingresa a tu cuenta</p>

                        {loginError && <div className="error-message">{loginError}</div>}

                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={loginForm.email}
                                    onChange={handleLoginChange}
                                    placeholder="Correo electrónico"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={loginForm.password}
                                    onChange={handleLoginChange}
                                    placeholder="Contraseña"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary" disabled={loginLoading}>
                                {loginLoading ? "Ingresando..." : "Ingresar"}
                            </button>
                        </form>

                        <div className="divider">
                            <span>o continúa con</span>
                        </div>

                        <button onClick={handleGoogleLogin} className="btn-google">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path fill="#4285F4"
                                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853"
                                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05"
                                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335"
                                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                    </div>
                </div>
            )}

            {/* Sección principal - Registro */}
            <main className="auth-main">
                <div className="register-section">
                    <div className="register-info">
                        <h1>Únete a nosotros</h1>
                        <p>Crea tu cuenta y accede a todas las funcionalidades de nuestra plataforma.</p>
                        <ul className="features-list">
                            <li>✓ Gestión completa de usuarios</li>
                            <li>✓ Panel de control intuitivo</li>
                            <li>✓ Acceso desde cualquier dispositivo</li>
                        </ul>
                    </div>

                    <div className="register-form-container">
                        <h2>Crear cuenta</h2>

                        {registerError && <div className="error-message">{registerError}</div>}
                        {registerSuccess && <div className="success-message">{registerSuccess}</div>}

                        <form onSubmit={handleRegisterSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={registerForm.nombre}
                                        onChange={handleRegisterChange}
                                        placeholder="Nombre"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="apellido"
                                        value={registerForm.apellido}
                                        onChange={handleRegisterChange}
                                        placeholder="Apellido"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={registerForm.email}
                                    onChange={handleRegisterChange}
                                    placeholder="Correo electrónico"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="telefono"
                                    value={registerForm.telefono}
                                    onChange={handleRegisterChange}
                                    placeholder="Teléfono"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        value={registerForm.password}
                                        onChange={handleRegisterChange}
                                        placeholder="Contraseña"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={registerForm.confirmPassword}
                                        onChange={handleRegisterChange}
                                        placeholder="Confirmar contraseña"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-register" disabled={registerLoading}>
                                {registerLoading ? "Creando cuenta..." : "Crear cuenta"}
                            </button>
                        </form>

                        <p className="login-link">
                            ¿Ya tienes cuenta?{" "}
                            <span onClick={() => setShowLoginModal(true)}>Inicia sesión</span>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="auth-footer">
                <p>© 2025 MiApp. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default AuthPage;