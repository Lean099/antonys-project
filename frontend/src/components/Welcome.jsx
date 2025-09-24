import logo from '../assets/logo.png';

const Welcome = () => {
  return (
    <>
      <div class="col-10 mx-auto p-5">
        <p class="fs-1 fw-bold text-dark">
          Sabor autentico,
          <br /> entregado caliente.
        </p>
        <img
          src={logo}
          alt=""
          class="d-block mx-auto"
          style={{ width: '400px' }}
        />
        <p class="fw-light mt-3 text-dark">
          Hamburguesas jugosas, sandwiches artesanales y pizzas de masa
          crujiente. Pedi facil, paga al recibir o en el local
        </p>
        <div class="d-flex justify-content-evenly">
          <button class="btn btn-sm btn-dark">
            Ver menu <i class="ms-1 fas fa-arrow-right"></i>
          </button>
          <button class="btn btn-sm btn-dark">Horarios y sucursales</button>
        </div>
      </div>
    </>
  );
};

export default Welcome;