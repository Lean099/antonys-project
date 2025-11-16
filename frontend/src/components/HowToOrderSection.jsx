// src/components/HowToOrderSection.jsx
import React from 'react';

const HowToOrderSection = () => {
  return (
    <section className="howto-section py-5">
      <div className="container text-center">
        <h2 className="display-6 fw-bold mb-3">Cómo hacer tu pedido</h2>
        <p className="text-muted mb-5">
          Pedir en <strong>Antony’s</strong> es rápido, simple y sin vueltas.
          Seguí estos pasos y disfrutá tu comida sin moverte de casa 🍔🍕
        </p>

        <div className="row gy-4">
          {/* Paso 1 */}
          <div className="col-md-4">
            <div className="card step-card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="icon-box mb-3">
                  <i className="bi bi-basket2-fill"></i>
                </div>
                <h5>1️⃣ Elegí tu plato</h5>
                <p className="text-muted small">
                  Ingresá al menú y seleccioná tus favoritos entre burgers,
                  lomos o pizzas.
                </p>
              </div>
            </div>
          </div>

          {/* Paso 2 */}
          <div className="col-md-4">
            <div className="card step-card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="icon-box mb-3">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <h5>2️⃣ Confirmá el pedido</h5>
                <p className="text-muted small">
                  Enviá tu pedido por WhatsApp o directamente desde la web,
                  indicando dirección y método de pago.
                </p>
              </div>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="col-md-4">
            <div className="card step-card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="icon-box mb-3">
                  <i className="bi bi-truck"></i>
                </div>
                <h5>3️⃣ ¡Recibí y disfrutá!</h5>
                <p className="text-muted small">
                  Te llevamos tu pedido caliente hasta la puerta de tu casa.
                  Pagá en efectivo o por transferencia 💵📱
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          {/*<a href="#menu" className="btn btn-dark btn-lg px-4 me-2">
            Ver menú
          </a>*/}
          <a
            href="https://wa.me/5493865000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark btn-lg px-4"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToOrderSection;