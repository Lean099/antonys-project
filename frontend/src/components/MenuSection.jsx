// src/components/MenuSection.jsx
import React, { useState } from 'react';

/**
 * Datos de ejemplo — reemplazá images por tus propias URLs/local assets.
 * Categorías: "hamburguesa", "sandwich", "pizza"
 */

const PRODUCTS = [
  // Hamburguesas
  {
    id: 'hb-especial',
    category: 'hamburguesa',
    title: 'Especial',
    price: 6500,
    desc: 'Medallón de carne, queso Tybo, jamón, huevo, lechuga, tomate.',
    image:
      'https://img1.elyerromenu.com/images/habano-s-bar-plus/hamburguesa-especial/img.webp',
  },
  {
    id: 'hb-americana',
    category: 'hamburguesa',
    title: 'Americana',
    price: 7500,
    desc: 'Medallón de carne, queso cheddar, panceta, cebolla, salsa barbacoa.',
    image:
      'https://www.apega.pe/wp-content/uploads/2025/07/receta-de-hamburguesa-americana.jpg',
  },
  {
    id: 'hb-roquefort',
    category: 'hamburguesa',
    title: 'Roquefort',
    price: 7000,
    desc: 'Medallón de carne, queso roquefort, mozzarella, panceta y cebolla.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60',
  },

  // Sandwiches (lomitos / milanesas)
  {
    id: 'lm-comun',
    category: 'sandwich',
    title: 'Lomito - Común',
    price: 8000,
    desc: 'Carne, queso Tybo, lechuga y tomate. Tamaño grande.',
    image:
      'https://estacionpalero.com.ar/wp-content/uploads/2024/09/LOMO-ESPECIAL-Y-PAPAS.webp',
  },
  {
    id: 'lm-especial',
    category: 'sandwich',
    title: 'Lomito - Especial',
    price: 8500,
    desc: 'Carne, queso Tybo, jamón, lechuga y tomate. Grande.',
    image:
      'https://www.circuitogastronomico.com/wp-content/uploads/2022/04/lomitook.jpg',
  },
  {
    id: 'ml-comun',
    category: 'sandwich',
    title: 'Milanesa - Común',
    price: 8000,
    desc: 'Milanesa, lechuga, tomate y aderezos. Grande.',
    image:
      'https://media.mdzol.com/p/d12f205355f60797d3681531ca29ac9b/adjuntos/373/imagenes/001/181/0001181077/1200x675/smart/el-sanguche-milanesa-fue-declarado-patrimonio-cultural-inmaterial-la-provincia-tucuman.jpg',
  },
  {
    id: 'ml-especial',
    category: 'sandwich',
    title: 'Milanesa - Especial',
    price: 8500,
    desc: 'Milanesa con queso Tybo, jamón, lechuga y tomate. Grande.',
    image:
      'https://media.elgourmet.com/articles/al8czp9o56_tucumanodemilanesa.jpg',
  },

  // Pizzas
  {
    id: 'pz-muzza',
    category: 'pizza',
    title: 'Pizza Muzzarella',
    price: 6500,
    desc: 'Salsa de tomate, muzzarella.',
    image:
      'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-tomate-albahaca-y-mozzarella-1080x671.jpg',
  },
  {
    id: 'pz-especial',
    category: 'pizza',
    title: 'Pizza Especial',
    price: 8000,
    desc: 'Mozzarella, jamón, panceta y verdes.',
    image:
      'https://alicante.com.ar/wp-content/uploads/2022/06/iStock-1048461158-Pizza-especial-scaled.jpg',
  },
  {
    id: 'pz-choclo',
    category: 'pizza',
    title: 'Pizza con Choclo',
    price: 8500,
    desc: 'Base con choclo, muzzarella y condimentos.',
    image:
      'https://milrecetas.net/wp-content/uploads/2017/06/pizza-de-choclo-02.jpg',
  },
  {
    id: 'pz-roquefort',
    category: 'pizza',
    title: 'Pizza con Roquefort',
    price: 8500,
    desc: 'Salsa, mozzarella y queso roquefort.',
    image:
      'https://paulacasero.com.ar/wp-content/uploads/2021/07/paulacasero-225.jpg',
  },
  {
    id: 'pz-calabresa',
    category: 'pizza',
    title: 'Pizza Calabresa',
    price: 8000,
    desc: 'Rodajas de salame/picante y mozzarella.',
    image: 'https://statics.diariomendoza.com.ar/2021/04/61a52d94060e0.jpg',
  },
  {
    id: 'pz-napo',
    category: 'pizza',
    title: 'Pizza Napolitana',
    price: 8000,
    desc: 'Tomate, albahaca y muzzarella.',
    image:
      'https://img-global.cpcdn.com/recipes/5fb5d55852fa8d06/1200x630cq80/photo.jpg',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'Todo' },
  { key: 'hamburguesa', label: 'Hamburguesas' },
  { key: 'sandwich', label: 'Sandwiches' },
  { key: 'pizza', label: 'Pizzas' },
];

const WHATSAPP_NUMBER = '5493865324127'; // REEMPLAZÁ por tu número (sin +)

function formatPrice(p) {
  return p.toString(); // si querés formato con miles: p.toLocaleString()
}

const MenuSection = () => {
  const [filter, setFilter] = useState('all');
  const [cart, setCart] = useState([]);

  const filtered = PRODUCTS.filter((p) =>
    filter === 'all' ? true : p.category === filter
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [{ id: product.id, product, qty: 1 }, ...prev];
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
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.product.price, 0);

  const buyNowSingle = (p) => {
    // Abrir WhatsApp con mensaje prellenado para ese producto
    const text = `Quiero pedir: *${p.title}* - ${
      p.desc
    } - Precio: $${formatPrice(p.price)}%0ACantidad: 1%0A%0AGracias.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, '_blank');
  };

  const checkoutCart = () => {
    if (cart.length === 0) return alert('El carrito está vacío.');
    let text = 'Pedido desde la web:%0A';
    cart.forEach((it) => {
      text += `- ${it.product.title} x${it.qty} ($${formatPrice(
        it.product.price
      )})%0A`;
    });
    text += `%0ATotal: $${formatPrice(totalPrice)}%0A`;
    text += '%0ANombre y dirección: ';
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, '_blank');
  };

  return (
    <section className="menu-section py-5">
      <div className="container">
        {/* Header filtro + carrito */}
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3 flex-wrap">
          <div className="btn-group" role="group" aria-label="Filtros">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`btn btn-outline-dark ${
                  filter === c.key ? 'active' : ''
                }`}
                onClick={() => setFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

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
              aria-expanded="false"
              aria-controls="miniCart"
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
            <div className="col-sm-6 col-lg-4" key={p.id}>
              <div className="card product-card h-100 shadow-sm">
                <img
                  src={p.image}
                  className="card-img-top product-img"
                  alt={p.title}
                  onError={(e) =>
                    (e.target.src =
                      'https://via.placeholder.com/800x600?text=Imagen')
                  }
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text small text-muted flex-grow-1">
                    {p.desc}
                  </p>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div>
                      <div className="h6 mb-0">${formatPrice(p.price)}</div>
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

        {/* Mini carrito collapsable */}
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
                          src={it.product.image}
                          alt={it.product.title}
                          width="60"
                          height="45"
                          style={{ objectFit: 'cover', borderRadius: 6 }}
                        />
                        <div>
                          <div className="fw-semibold">{it.product.title}</div>
                          <div className="small text-muted">
                            ${formatPrice(it.product.price)}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="qty"
                        >
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
                    <div className="h5 mb-0">${formatPrice(totalPrice)}</div>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={() => setCart([])}
                    >
                      Vaciar
                    </button>
                    <button className="btn btn-dark" onClick={checkoutCart}>
                      Pedir por WhatsApp
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
