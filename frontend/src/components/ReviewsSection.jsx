// src/components/ReviewsSection.jsx
import React, { useState } from 'react';

const initialReviews = [
  {
    id: 1,
    name: 'Lucas G.',
    rating: 5,
    text: 'El mejor lomo de Aguilares. Siempre llega caliente y la atención es excelente.',
    date: '2024-08-10',
  },
  {
    id: 2,
    name: 'María P.',
    rating: 4,
    text: 'Hamburguesas con muy buen pan y sabor. Recomiendo el combo clásico.',
    date: '2024-09-02',
  },
  {
    id: 3,
    name: 'Andrés R.',
    rating: 5,
    text: 'Pizzas estilo casero, masa crocante. Volvería seguro.',
    date: '2024-07-21',
  },
  {
    id: 4,
    name: 'Camila S.',
    rating: 4,
    text: 'Buena relación precio-calidad. El delivery fue rápido.',
    date: '2024-06-15',
  },
];

const Stars = ({ n }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={`star ${i <= n ? 'filled' : ''}`} aria-hidden="true">
        ★
      </span>
    );
  }
  return <span className="stars">{stars}</span>;
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const addReview = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return alert('Completá nombre y comentario');

    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      rating: Number(form.rating),
      text: form.text.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    setReviews((r) => [newReview, ...r]);
    setForm({ name: '', rating: 5, text: '' });
  };

  return (
    <section className="reviews-section py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6">
            <h2 className="display-6 mb-3">Opiniones de clientes</h2>
            <p className="text-muted">
              Las voces de nuestra comunidad en Aguilares. ¿Probaste Antony's? Dejanos tu opinión abajo.
            </p>

            <div className="reviews-list mt-4">
              {reviews.map((r) => (
                <div key={r.id} className="card mb-3 review-card shadow-sm">
                  <div className="card-body d-flex gap-3 align-items-start">
                    <div className="avatar flex-shrink-0">
                      <img
                        src={`https://i.pravatar.cc/60?u=${r.id}`}
                        alt={r.name}
                        className="rounded-circle"
                        width="60"
                        height="60"
                      />
                    </div>
                    <div className="review-content">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <strong>{r.name}</strong>
                          <div className="small text-muted">{r.date}</div>
                        </div>
                        <div>
                          <Stars n={r.rating} />
                        </div>
                      </div>
                      <p className="mb-0 mt-2 small text-muted">{r.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario para agregar reseña */}
          <div className="col-lg-6">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Dejá tu reseña</h5>
              <form onSubmit={addReview}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Calificación</label>
                  <select
                    className="form-select"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                  >
                    <option value="5">5 - Excelente</option>
                    <option value="4">4 - Muy bueno</option>
                    <option value="3">3 - Bueno</option>
                    <option value="2">2 - Regular</option>
                    <option value="1">1 - Malo</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Comentario</label>
                  <textarea
                    name="text"
                    className="form-control"
                    rows="4"
                    value={form.text}
                    onChange={handleChange}
                    placeholder="Contanos qué te pareció..."
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-dark">
                    Enviar reseña
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setForm({ name: '', rating: 5, text: '' })}
                  >
                    Limpiar
                  </button>
                </div>

                <small className="text-muted d-block mt-3">
                  (El formulario guarda las reseñas solo en la sesión local — sin backend).
                </small>
              </form>
            </div>

            <div className="mt-3">
              <h6 className="mb-2">Puntuación promedio</h6>
              <AverageRating reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componente pequeño para promedio
const AverageRating = ({ reviews }) => {
  const avg =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
  const rounded = Math.round(avg * 10) / 10;
  return (
    <div className="d-flex align-items-center gap-3">
      <div className="avg-box p-3 text-center">
        <div className="h4 mb-0">{rounded}</div>
        <div className="small text-muted">{reviews.length} reseñas</div>
      </div>
      <div>
        <Stars n={Math.round(avg)} />
      </div>
    </div>
  );
};

export default ReviewsSection;

