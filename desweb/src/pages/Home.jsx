import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    <div style={{ padding: "20px" }}>
      <h1>Formulario CRUD - React</h1>

      <button className="add-btn" onClick={() => setShowForm(true)}>
        Agregar Usuario
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <UserForm onSubmit={handleSubmit} editingUser={editingUser} />
            <button className="close-btn" onClick={closeForm}>X</button>
          </div>
        </div>
      )}

      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
