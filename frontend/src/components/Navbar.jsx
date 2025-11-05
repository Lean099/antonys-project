import React from 'react';
import logo from '../assets/logo.png';
import burgerlogo from '../assets/burgerlogo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';
import CartSection from './CartSection';

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg rounded-bottom border border-dark border-1"
        style={{ background: '#E8DFCA' }}
      >
        <div className="container-fluid">
          {/* Marca / Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img
              src={burgerlogo}
              alt="Logo"
              style={{ width: '50px', height: '50px', marginLeft: '10px' }}
            />
            <span
              className="ms-3"
              style={{ fontSize: '14px', fontFamily: 'Roboto' }}
            >
              Burguer, Pizzas and Lomos
            </span>
          </a>

          {/* Botón hamburguesa (para pantallas chicas) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido colapsable */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarContent"
          >
            {/* Buscador */}
            <form
              className="d-flex my-2 my-lg-0 position-relative"
              role="search"
            >
              <div
                className="position-relative"
                style={{ maxWidth: '250px', width: '100%' }}
              >
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

            {/* Botones */}
            <div className="ms-lg-3 mt-3 mt-lg-0 d-flex flex-column flex-lg-row gap-2">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalLogin"
              >
                Inicio de sesión
              </button>
              <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalRegister"
              >
                Registrarse
              </button>
              <button
                type="button"
                className="btn btn-dark position-relative"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCart"
              >
                <i className="fas fa-shopping-cart"></i> Carrito
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  2<span className="visually-hidden">unread messages</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modales */}
      <LoginSection />
      <RegisterSection />
      <CartSection />
    </>
  );
};

export default Navbar;
