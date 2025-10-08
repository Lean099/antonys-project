import React from 'react';

const LoginSection = () => {
  return (
    <>
      <div
        class="modal fade"
        id="exampleModalLogin"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Inicio de Sesion
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@gmail.com"
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleFormControlInput2"
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
              <button type="button" class="btn btn-dark">
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSection;