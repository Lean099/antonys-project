import React, { useEffect, useState } from "react";
import { getData, deleteData } from "../services/api";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

const UserOrdersModal = ({ usuario }) => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Cargar pedidos al abrir modal
  const loadPedidos = async () => {
    if (!usuario) return;
    setLoading(true);

    const response = await getData(`pedidos/usuario/${usuario.id_usuario}`);

    if (response.error) {
      setError("Error al cargar pedidos");
    } else {
      setPedidos(response);
    }

    setLoading(false);
  };

  const handleDelete = async (id_pedido) => {
    if (!confirm("¿Seguro que deseas eliminar este pedido?")) return;

    const response = await deleteData(`pedidos/${id_pedido}`);

    if (response.error) {
      setError(response.error);
      return;
    }

    setMessage("Pedido eliminado con éxito.");
    setPedidos(pedidos.filter(p => p.id_pedido !== id_pedido));

    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <>
      {/* BOTÓN QUE ABRE EL MODAL */}
      <button
        className="btn btn-secondary btn-sm ms-2"
        data-bs-toggle="modal"
        data-bs-target="#modalUserOrders"
        onClick={loadPedidos}
      >
        Mis pedidos
      </button>

      {/* MODAL */}
      <div
        className="modal fade"
        id="modalUserOrders"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Pedidos de {usuario?.nombre}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">

              {loading && <p>Cargando pedidos...</p>}
              {error && <p className="text-danger">{error}</p>}
              {message && <p className="text-success">{message}</p>}

              {pedidos.length === 0 && !loading ? (
                <p>No tienes pedidos aún.</p>
              ) : (
                pedidos.map((p) => (
                  <div key={p.id_pedido} className="border rounded p-3 mb-3">

                    <div className="d-flex justify-content-between">
                      <h6>Numero/ID Pedido #{p.id_pedido}</h6>
                      <span className="badge bg-dark">{p.estado}</span>
                    </div>

                    <p><strong>Total:</strong> ${p.total}</p>

                    <p><strong>Productos:</strong></p>
                    <ul>
                    {JSON.parse(p.productos_json).map((prod, i) => (
                        <li key={i}>
                        {prod.qty} × <strong>{prod.product.nombre}</strong> — $
                        {prod.product.precio * prod.qty}
                        </li>
                    ))}
                    </ul>

                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => handleDelete(p.id_pedido)}
                    >
                      Eliminar pedido
                    </button>

                  </div>
                ))
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrdersModal;
