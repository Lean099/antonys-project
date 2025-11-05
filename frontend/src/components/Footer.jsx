import React from 'react';
import BurgerLogo from '../assets/logo.png';
import image from '../assets/image.png';

const Footer = () => {
  return (
    <footer
      className="container-fluid py-4 mt-5"
      style={{ background: '#303841', color: 'white' }}
    >
      <div className="row text-center text-md-start">
        {/* Columna 1 */}
        <div className="col-12 col-md-4 mb-4 mb-md-0">
          <img
            src={image}
            alt="Antonys logo"
            className="mb-2"
            style={{ width: '120px', height: '70px' }}
          />
          <p className="mb-0">Hecho con ❤️ para los fans de lo rico y simple</p>
        </div>

        {/* Columna 2 */}
        <div className="col-12 col-md-4 mb-4 mb-md-0">
          <p className="fw-bold">Secciones</p>
          <ul className="list-unstyled">
            <li>
              <a
                className="link-light link-offset-2 link-underline link-underline-opacity-0"
                href="#menu"
              >
                Menú
              </a>
            </li>
            <li>
              <a
                className="link-light link-offset-2 link-underline link-underline-opacity-0"
                href="#horarios"
              >
                Horarios
              </a>
            </li>
            <li>
              <a
                className="link-light link-offset-2 link-underline link-underline-opacity-0"
                href="#cuenta"
              >
                Mi cuenta
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="col-12 col-md-4">
          <p className="fw-bold">Contacto</p>
          <p className="mb-1">WhatsApp: +54 381321567</p>
          <p className="mb-0">Instagram: @Antonys</p>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="text-center mt-4 border-top border-light pt-3 small">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Antony’s — Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
