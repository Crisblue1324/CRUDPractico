export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.dni}</td>
                <td>{u.nombres}</td>
                <td>{u.apellidos}</td>
                <td>{new Date(u.fechaNacimiento).toLocaleDateString()}</td>
                <td>{u.genero}</td>
                <td>{u.ciudad}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(u)}>✏️</button>
                  <button className="delete-btn" onClick={() => onDelete(u._id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data-row">
                📭 No hay registros disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
