import {useEffect, useState} from "react";
import {getUsers, createUser, updateUser, deleteUser} from "../api/userService";
import {getCurrentUser} from "../api/authService";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import "../styles/Home.css";

export default function Home({onLogout}) {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const currentUser = getCurrentUser();

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSubmit = async (data) => {
        try {
            if (editingUser) {
                await updateUser(editingUser._id, data);
                setEditingUser(null);
            } else {
                await createUser(data);
            }
            setShowForm(false);
            loadUsers();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            try {
                await deleteUser(id);
                loadUsers();
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
            }
        }
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                <div className="header-left">
                    <span className="header-icon">⚡</span>
                    <h1>MiApp</h1>
                </div>

                <div className="header-right">
                    <div
                        className="user-menu-container"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="user-avatar">
                            {currentUser?.nombre?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span className="user-name">{currentUser?.nombre || "Usuario"}</span>
                        <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6"/>
                        </svg>

                        {showUserMenu && (
                            <div className="user-dropdown">
                                <div className="dropdown-header">
                                    <span className="dropdown-email">{currentUser?.email}</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout" onClick={onLogout}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         strokeWidth="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                        <polyline points="16 17 21 12 16 7"/>
                                        <line x1="21" y1="12" x2="9" y2="12"/>
                                    </svg>
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="home-main">
                <div className="page-title">
                    <h2>Gestión de Usuarios</h2>
                    <p>Administra los usuarios del sistema</p>
                </div>

                <button className="add-btn" onClick={() => setShowForm(true)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Agregar Usuario
                </button>

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <UserForm onSubmit={handleSubmit} editingUser={editingUser}/>
                            <button className="close-btn" onClick={closeForm}>✕</button>
                        </div>
                    </div>
                )}

                <UserList users={users} onEdit={handleEdit} onDelete={handleDelete}/>
            </main>
        </div>
    );
}