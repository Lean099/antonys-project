const RegisterSection = () => {
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
              <div class="mb-3">
                <label for="exampleFormControlInput3" class="form-label">
                  Usuario
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput3"
                  placeholder="fulanito"
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