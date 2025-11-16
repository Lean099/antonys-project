import { useState, useEffect } from "react";
import { postData } from "../services/api"; // Ajusta la ruta si fuera necesario

const RegisterSection = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const limpiarMensajes = () => {
      setError(null);
      setMessage(null);
    };

    const modal = document.getElementById("exampleModalRegister");
    modal.addEventListener("show.bs.modal", limpiarMensajes);

    return () => modal.removeEventListener("show.bs.modal", limpiarMensajes);
  }, []);

  const handleRegister = async () => {
    setMessage(null);
    setError(null);

    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const response = await postData("usuarios/register", {
      nombre,
      email,
      password,
    });

    if (response.error) {
      setError(response.error);
    } else {
      setMessage("Usuario creado con éxito.");

      // Borramos mensaje después de 2s
      setTimeout(() => setMessage(null), 2000);

      setNombre("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="exampleModalRegister"
        tabindex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel2">
                Registro
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}
              {message && (
                <div className="alert alert-success py-2">{message}</div>
              )}

              <div class="mb-3">
                <label for="exampleFormControlInput3" class="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput3"
                  placeholder="fulanito"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput4" class="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput4"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput5" class="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleFormControlInput5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>

              <button
                type="button"
                class="btn btn-dark"
                onClick={handleRegister}
              >
                Crear usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSection;
