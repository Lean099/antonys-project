import { React } from 'react';
import burgerlogo from '../assets/burgerlogo.png';

const Navbar = () => {
  return (
    <>
      <nav
        class="navbar rounded-bottom border border-dark border border-1"
        style={{ background: '#E8DFCA' }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src={burgerlogo}
              alt=""
              style={{ width: '50px', height: '50px', marginLeft: '10px' }}
            />
            <span
              class="ms-3"
              style={{ fontSize: '14px', fontFamily: 'Roboto' }}
            >
              Burguer, Pizzas and Lomos
            </span>
          </a>
          <div class="d-flex">
            <form class="d-flex position-relative" role="search">
              <div className="position-relative" style={{ maxWidth: '300px' }}>
                <i
                  className="bi bi-search position-absolute"
                  style={{
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#999',
                  }}
                ></i>
                <input
                  type="search"
                  className="form-control ps-5"
                  placeholder="Buscar platos..."
                  aria-label="Buscar"
                />
              </div>
            </form>

            <div class="ms-3">
              <button
                type="button"
                class="btn btn-outline-dark"
                data-bs-toggle="modal" data-bs-target="#exampleModalLogin"
              >
                Inicio de sesion
              </button>
              <button type="button" class="btn mx-1 btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModalRegister">
                Registrarse
              </button>
              <button type="button" class="btn btn-dark position-relative" data-bs-toggle="modal" data-bs-target="#exampleModalCart">
                <i class="fas fa-shopping-cart"></i> Carrito
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  2<span class="visually-hidden">unread messages</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;