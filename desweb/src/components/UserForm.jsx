import { useState, useEffect } from "react";
import "../styles/form.css";

const initialForm = {
  dni: "",
  nombres: "",
  apellidos: "",
  fechaNacimiento: "",
  genero: "Masculino",
  ciudad: ""
};

export default function UserForm({ onSubmit, editingUser }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialForm); 
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="dni"
        placeholder="DNI"
        value={form.dni}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombres"
        placeholder="Nombres"
        value={form.nombres}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="apellidos"
        placeholder="Apellidos"
        value={form.apellidos}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="fechaNacimiento"
        value={form.fechaNacimiento}
        onChange={handleChange}
        required
      />
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="genero"
            value="Masculino"
            checked={form.genero === "Masculino"}
            onChange={handleChange}
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            name="genero"
            value="Femenino"
            checked={form.genero === "Femenino"}
            onChange={handleChange}
          />
          Femenino
        </label>
      </div>
      <select name="ciudad" value={form.ciudad} onChange={handleChange} required>
        <option value="">Seleccione ciudad</option>
        <option value="Quito">Quito</option>
        <option value="Guayaquil">Guayaquil</option>
        <option value="Cuenca">Cuenca</option>
      </select>
      <button type="submit">{editingUser ? "Actualizar" : "Guardar"}</button>
    </form>
  );
}
