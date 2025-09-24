import React from 'react';
import BurgerLogo from '../assets/logo.png';
import image from '../assets/image.png';

const Footer = () => {
  return (
    <>
      <div
        class="container-fluid"
        style={{ background: '#303841', color: 'white' }}
      >
        <div class="row">
          <div class="col-4 border border-light border-2">
            <div>
              <img
                src={image}
                alt=""
                style={{ width: '120px', height: '70px', marginLeft: '10px' }}
              />
              <p>Hecho con ❤️ para los fans de lo rico y simple</p>
            </div>
          </div>
          <div class="col-4 border border-dark border-2">
            <p>Secciones</p>
            <ul>
              <li>
                <a
                  class="link-light link-offset-2 link-underline link-underline-opacity-0"
                  href="#"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  class="link-light link-offset-2 link-underline link-underline-opacity-0"
                  href="#"
                >
                  Horarios
                </a>
              </li>
              <li>
                <a
                  class="link-light link-offset-2 link-underline link-underline-opacity-0"
                  href="#"
                >
                  Mi cuenta
                </a>
              </li>
            </ul>
          </div>
          <div class="col border border-secondary border-2">
            <p>Contacto</p>
            <p>WhatsApp: +54 381321567</p>
            <p>Instagram: @Antonys</p>
          </div>
        </div>
        <div class="row"></div>
      </div>
    </>
  );
};

export default Footer;