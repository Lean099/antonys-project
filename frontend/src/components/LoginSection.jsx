// src/components/LoginSection.jsx
import React, { useState, useEffect } from "react";
import { postData } from "../services/api"; // ajustá la ruta si hace falta

const LoginSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

   // 🔹 LIMPIAR MENSAJES AL ABRIR EL MODAL
  useEffect(() => {
    const modalEl = document.getElementById("exampleModalLogin");
    if (!modalEl) return;

    const cleanMessages = () => {
      setError(null);
      setMessage(null);
      setEmail("");
      setPassword("");
    };

    modalEl.addEventListener("shown.bs.modal", cleanMessages);

    return () => {
      modalEl.removeEventListener("shown.bs.modal", cleanMessages);
    };
  }, []);

  const handleLogin = async () => {
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // petición
    const response = await postData("usuarios/login", { email, password });

    // manejar error desde API
    if (response.error) {
      setError(response.error);
      return;
    }

    // OK -> guardar user, notificar y cerrar modal
    localStorage.setItem("usuario", JSON.stringify(response));
    window.dispatchEvent(new Event("usuarioActualizado"));

    // cerrar modal (fallback si no hay instancia)
    try {
      const modalEl = document.getElementById("exampleModalLogin");
      // window.bootstrap viene si importaste bootstrap.bundle
      const modalInstance = window.bootstrap?.Modal?.getInstance(modalEl) ?? new window.bootstrap.Modal(modalEl);
      modalInstance.hide();
    } catch (e) {
      // si algo falla con bootstrap, solo logueamos y seguimos
      console.warn("No se pudo cerrar modal con bootstrap:", e);
    }

    setEmail("");
    setPassword("");
    setMessage("Inicio de sesión exitoso.");
  };

  return (
    <>
      <div className="modal fade" id="exampleModalLogin" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Inicio de Sesión</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}
              {message && <div className="alert alert-success py-2">{message}</div>}

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Correo</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@gmail.com"
                  value={email} onChange={e=>setEmail(e.target.value)} />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput2" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="exampleFormControlInput2"
                  value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-dark" onClick={handleLogin}>Ingresar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
