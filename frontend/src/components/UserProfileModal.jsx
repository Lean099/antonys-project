import { useEffect, useState } from "react";
import { putData, deleteData } from "../services/api";

const UserProfileModal = ({ usuario }) => {
  const [nombre, setNombre] = useState(usuario?.nombre || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Reset cuando se abre el modal
  useEffect(() => {
    const onShow = () => {
      setNombre(usuario?.nombre || "");
      setEmail(usuario?.email || "");
      setPassword("");
      setError(null);
      setMessage(null);
    };

    const modal = document.getElementById("modalUserProfile");
    modal.addEventListener("show.bs.modal", onShow);

    return () => modal.removeEventListener("show.bs.modal", onShow);
  }, [usuario]);

  // Actualizar datos
  const handleUpdate = async () => {
    setError(null);
    setMessage(null);

    const response = await putData(`usuarios/${usuario.id_usuario}`, {
      nombre,
      email,
      password
    });

    if (response.error) {
      setError(response.error);
    } else {
      setMessage("Datos actualizados con éxito");

      localStorage.setItem("usuario", JSON.stringify({
        ...usuario,
        nombre,
        email
      }));

      window.dispatchEvent(new Event("usuarioActualizado"));

      setTimeout(() => setMessage(null), 2000);
    }
  };

  // Eliminar cuenta
  const handleDelete = async () => {
  setError(null);
  setMessage(null);

  // 1) Llamar al backend
  const response = await deleteData(`usuarios/${usuario.id_usuario}`);

  if (response.error) {
    setError(response.error);
    return;
  }

  // 2) FORZAR cierre del modal sí o sí
  const modalEl = document.getElementById("modalUserProfile");

  if (modalEl) {
    // Intentar cierre normal de Bootstrap
    try {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
    } catch (e) {
      // Ignorar errores
    }

    // Cierre garantizado
    modalEl.classList.remove("show");
    modalEl.style.display = "none";
    modalEl.setAttribute("aria-hidden", "true");

    // Eliminar backdrop
    document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());

    // Eliminar scroll bloqueado del body
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  // 3) Borrar usuario y refrescar navbar
  localStorage.removeItem("usuario");
  window.dispatchEvent(new Event("usuarioActualizado"));
};

  return (
    <div class="modal fade" id="modalUserProfile" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Mi Cuenta</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            {error && <div class="alert alert-danger py-2">{error}</div>}
            {message && <div class="alert alert-success py-2">{message}</div>}

            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input type="text" class="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Correo</label>
              <input type="email" class="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Nueva contraseña (opcional)</label>
              <input type="password" class="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-danger" onClick={handleDelete}>Eliminar cuenta</button>
            <button class="btn btn-dark" onClick={handleUpdate}>Actualizar</button>
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
