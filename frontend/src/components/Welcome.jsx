import logo from '../assets/logo.png';

const Welcome = () => {
  return (
    <div className="container my-5">
      <div className="text-center">
        <p className="fs-1 fw-bold text-dark mb-4">
          Sabor auténtico,
          <br /> entregado caliente.
        </p>

        {/* Imagen con tamaño adaptable */}
        <img
          src={logo}
          alt="Logo"
          className="img-fluid mx-auto d-block"
          style={{ maxWidth: '400px', height: 'auto' }}
        />

        <p className="fw-light mt-4 text-dark px-3 px-md-5">
          Hamburguesas jugosas, sándwiches artesanales y pizzas de masa
          crujiente. Pedí fácil, pagá al recibir o en el local.
        </p>

        {/* Botones responsivos */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-4">
          <button className="btn btn-dark btn-sm">
            Ver menú <i className="ms-1 fas fa-arrow-right"></i>
          </button>
          <button className="btn btn-dark btn-sm">Horarios y sucursales</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
