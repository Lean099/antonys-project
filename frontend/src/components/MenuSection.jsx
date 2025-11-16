// src/components/MenuSection.jsx
import React, { useState, useEffect } from "react";
import { getData, postData } from "../services/api";

const WHATSAPP_NUMBER = "5493865324127";

function formatPrice(p) {
  return p?.toLocaleString("es-AR");
}

const MenuSection = () => {
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [error, setError] = useState(null);

  // ============================
  // Cargar categorías
  // ============================
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getData("categorias");

      if (res.error) {
        setError(res.error);
        setLoadingCategories(false);
        return;
      }

      const allOption = { id_categoria: "all", nombre: "Todo" };
      setCategories([allOption, ...res]);
      setLoadingCategories(false);
    };

    fetchCategories();
  }, []);

  // ============================
  // Cargar productos
  // ============================
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getData("productos");

      if (res.error) {
        setError(res.error);
        setLoadingProducts(false);
        return;
      }

      setProducts(res);
      setLoadingProducts(false);
    };

    fetchProducts();
  }, []);

  // ============================
  // Filtrar productos
  // ============================
  const filtered = products.filter((p) =>
    filter === "all" ? true : p.id_categoria === filter
  );

  // ============================
  // Carrito
  // ============================
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id_producto);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id_producto ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        {
          id: product.id_producto,
          product,
          qty: 1,
        },
        ...prev,
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
        )
        .filter(Boolean)
    );
  };

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce(
    (s, i) => s + i.qty * i.product.precio,
    0
  );

  // ============================
  // Comprar por WhatsApp (individual)
  // ============================
  const buyNowSingle = (p) => {
    const text = `Quiero pedir: *${p.nombre}* - ${p.descripcion} - Precio: $${formatPrice(
      p.precio
    )}%0ACantidad: 1%0A%0AGracias.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  // ============================
  // HACER PEDIDO (nuevo)
  // ============================
  const makeOrder = async () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    const loginButton = document.getElementById("btnOpenLoginModal");
    if (loginButton) loginButton.click();
    return;
  }

  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  try {
    const response = await postData("pedidos", {
      id_usuario: usuario.id_usuario,
      total: totalPrice,
      productos_json: JSON.stringify(cart),
      estado: "pendiente",
    });

    if (response.error) throw new Error(response.error);

    alert("¡Pedido creado con éxito!");
    setCart([]);

    const miniCart = document.getElementById("miniCart");
    if (miniCart?.classList.contains("show")) {
      miniCart.classList.remove("show");
    }

  } catch (err) {
    console.error(err);
    alert("Error al hacer el pedido.");
  }
};

  // ============================
  // Render
  // ============================
  if (loadingProducts || loadingCategories)
    return <div className="text-center py-5">Cargando menú...</div>;

  if (error)
    return <div className="text-center text-danger py-5">Error: {error}</div>;

  return (
    <section className="menu-section py-5">
      <div className="container">

        {/* Filtros + carrito */}
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
          <div className="btn-group">
            {categories.map((c) => (
              <button
                key={c.id_categoria}
                type="button"
                className={`btn btn-outline-dark ${
                  filter === c.id_categoria ? "active" : ""
                }`}
                onClick={() => setFilter(c.id_categoria)}
              >
                {c.nombre}
              </button>
            ))}
          </div>

          {/* Carrito */}
          <div className="cart-summary d-flex align-items-center gap-3">
            <div className="me-2 text-end d-none d-md-block">
              <div className="small text-muted">Items: {totalQty}</div>
              <div className="fw-bold">${formatPrice(totalPrice)}</div>
            </div>
            <button
              className="btn btn-dark position-relative"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#miniCart"
            >
              <i className="bi bi-cart3"></i>
              <span className="badge bg-warning text-dark ms-2">
                {totalQty}
              </span>
            </button>
          </div>
        </div>

        {/* Grid productos */}
        <div className="row g-3">
          {filtered.map((p) => (
            <div className="col-sm-6 col-lg-4" key={p.id_producto}>
              <div className="card product-card h-100 shadow-sm">
                <img
                  src={
                    p.imagen_url ||
                    "https://via.placeholder.com/800x600?text=Imagen"
                  }
                  className="card-img-top product-img"
                  alt={p.nombre}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text small text-muted flex-grow-1">
                    {p.descripcion}
                  </p>

                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div>
                      <div className="h6 mb-0">${formatPrice(p.precio)}</div>
                      <div className="small text-muted">unidad</div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => buyNowSingle(p)}
                      >
                        Comprar
                      </button>
                      <button
                        className="btn btn-dark"
                        onClick={() => addToCart(p)}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini carrito */}
        <div className="collapse mt-4" id="miniCart">
          <div className="card card-body shadow-sm">
            <h5 className="mb-3">Tu carrito</h5>

            {cart.length === 0 ? (
              <div className="text-muted">El carrito está vacío</div>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cart.map((it) => (
                    <li
                      key={it.id}
                      className="list-group-item d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={
                            it.product.imagen_url ||
                            "https://via.placeholder.com/800x600"
                          }
                          width="60"
                          height="45"
                          style={{ objectFit: "cover", borderRadius: 6 }}
                        />
                        <div>
                          <div className="fw-semibold">
                            {it.product.nombre}
                          </div>
                          <div className="small text-muted">
                            ${formatPrice(it.product.precio)}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => changeQty(it.id, -1)}
                          >
                            -
                          </button>
                          <button className="btn btn-sm btn-light">
                            {it.qty}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => changeQty(it.id, +1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(it.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="small text-muted">Total</div>
                    <div className="h5 mb-0">
                      ${formatPrice(totalPrice)}
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={() => setCart([])}
                    >
                      Vaciar
                    </button>

                    {/* BOTÓN NUEVO */}
                    <button className="btn btn-dark" onClick={makeOrder}>
                      Hacer pedido
                    </button>

                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MenuSection;
