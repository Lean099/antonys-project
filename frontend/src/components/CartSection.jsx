import React, { useState } from 'react';

const datos = [
  {
    id: 'hamburguesa',
    titulo: 'Hamburguesa Americana',
    descripcion: 'Tipo: Doble carne. Ingredientes: lechuga, tomate, queso.',
    img: 'https://media.istockphoto.com/id/495204032/photo/fresh-tasty-burger.jpg?s=612x612&w=0&k=20&c=k6X_gSHlo-WdKsqTnfBjoEbjdhrlz6RNhUs23ivpIxk=',
    cantidad: 1,
  },
  {
    id: 'lomito',
    titulo: 'Lomito',
    descripcion: 'Lomo especial con papas.',
    img: 'https://estacionpalero.com.ar/wp-content/uploads/2024/09/LOMO-ESPECIAL-Y-PAPAS.webp',
    cantidad: 1,
  },
  {
    id: 'pizza',
    titulo: 'Pizza Familiar',
    descripcion: 'Muzzarella con orégano.',
    img: 'https://www.paulinacocina.net/wp-content/uploads/2023/03/pizza-casera.jpg', // reemplaza por una url real si querés
    cantidad: 1,
  },
];

const CartSection = () => {
  // Inicializamos el estado de cantidades a partir de los datos
  const initialCounts = datos.reduce((acc, item) => {
    acc[item.id] = item.cantidad ?? 1;
    return acc;
  }, {});

  const [contador, setContador] = useState(initialCounts);

  // sumar y restar reciben el id del producto
  const sumar = (id) => {
    setContador((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const restar = (id) => {
    setContador((prev) => {
      const actual = prev[id] || 1;
      const nuevo = Math.max(1, actual - 1);
      return { ...prev, [id]: nuevo };
    });
  };

  const handleChange = (e, id) => {
    const valor = parseInt(e.target.value, 10);
    if (Number.isNaN(valor)) return;
    setContador((prev) => ({ ...prev, [id]: Math.max(1, valor) }));
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalCart"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">
                Carrito de compra
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {datos.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3"
                  style={{ maxWidth: '1000px' }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.img}
                        className="img-fluid rounded-start"
                        alt={item.titulo}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.titulo}</h5>
                        <p className="card-text">{item.descripcion}</p>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Agregado hace unos minutos
                          </small>
                        </p>

                        <div className="count d-flex align-items-center gap-2">
                          <span>Cantidad:</span>

                          <button
                            type="button"
                            onClick={() => restar(item.id)}
                            className="btn btn-outline-secondary btn-sm"
                          >
                            -
                          </button>

                          <input
                            type="number"
                            name={`input-${item.id}`}
                            value={contador[item.id] ?? 1}
                            onChange={(e) => handleChange(e, item.id)}
                            className="form-control form-control-sm"
                            style={{ width: '60px', textAlign: 'center' }}
                            min="1"
                          />

                          <button
                            type="button"
                            onClick={() => sumar(item.id)}
                            className="btn btn-outline-secondary btn-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => {
                  // ejemplo: mostrar por consola el contenido del carrito
                  console.log('Carrito:', contador);
                  // aquí podés enviar `contador` al server o al contexto global
                }}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSection;
