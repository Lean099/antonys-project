import React, { useEffect, useState } from "react";
import logo from '../assets/logo.png';
import burgerlogo from '../assets/burgerlogo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';
import CartSection from './CartSection';
import UserProfileModal from "./UserProfileModal";
import UserOrdersModal from "./userOrderModal";

const Navbar = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Cargar usuario guardado
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) setUsuario(JSON.parse(storedUser));

    // Escuchar cambios
    const handler = () => {
      const newUser = localStorage.getItem("usuario");
      setUsuario(newUser ? JSON.parse(newUser) : null);
    };

    window.addEventListener("usuarioActualizado", handler);

    return () => window.removeEventListener("usuarioActualizado", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.dispatchEvent(new Event("usuarioActualizado"));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg rounded-bottom border border-dark border-1" style={{ background: '#E8DFCA' }}>
        <div className="container-fluid">

          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={burgerlogo} alt="Logo" style={{ width: '50px', height: '50px', marginLeft: '10px' }} />
            <span className="ms-3" style={{ fontSize: '14px', fontFamily: 'Roboto' }}>
              Burguer, Pizzas and Lomos
            </span>
          </a>

          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">

            {/* Si NO hay usuario */}
            {!usuario ? (
              <div className="ms-lg-3 d-flex flex-column flex-lg-row gap-2">
                <button className="btn btn-outline-dark" id="btnOpenLoginModal" data-bs-toggle="modal" data-bs-target="#exampleModalLogin">
                  Inicio de sesión
                </button>
                <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModalRegister">
                  Registrarse
                </button>
              </div>
            ) : (
              <>
              <div className="ms-lg-3 d-flex align-items-center gap-2">
                <span className="fw-bold">Hola, {usuario.nombre}</span>
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>

              <button
                className="btn btn-outline-dark btn-sm ms-2"
                data-bs-toggle="modal"
                data-bs-target="#modalUserProfile"
              >
                ⚙ Mi cuenta
              </button>

              <UserOrdersModal usuario={usuario} />
              
            </>
            )}

            {/* Carrito 
            <button className="btn btn-dark position-relative ms-3" data-bs-toggle="modal" data-bs-target="#exampleModalCart">
              <i className="fas fa-shopping-cart"></i> Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                2
              </span>
            </button>*/}
          </div>
        </div>
      </nav>

      <LoginSection />
      <RegisterSection />
      {/*<CartSection />*/}
      <UserProfileModal usuario={usuario} />
    </>
  );
};

export default Navbar;
