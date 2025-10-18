// src/components/LocationsSection.jsx
import React from 'react';

/**
 * Reemplazá los valores en siteInfo por los de tu local.
 * - lat/lng: coordenadas del local (ej: -27.15, -65.28)
 * - mapEmbedUrl: (opcional) la URL completa del iframe que te da Google Maps en "Compartir -> Insertar mapa"
 *   Si dejás mapEmbedUrl vacío, el componente construye un src usando lat/lng.
 */

const siteInfo = {
  name: "Antony's - Sucursal Central",
  addressLine1: 'Diego de villarroel 1819',
  city: 'Aguilares, Tucumán',
  phone: '+54 9 3865 123-456',
  phoneDisplay: '(3865) 123-456',
  email: 'antonys@gmail.com',
  lat: '-27.4388727', // REEMPLAZAR con la latitud real
  lng: '-65.614913', // REEMPLAZAR con la longitud real
  mapEmbedUrl: '', // OPCIONAL: pegar aquí la URL del iframe que te da Google Maps (recomendado si la tenés)
  schedule: [
    { day: 'Lunes', hours: 'CERRADO' },
    { day: 'Martes', hours: 'CERRADO' },
    { day: 'Miércoles', hours: 'CERRADO' },
    { day: 'Jueves', hours: '20:00 - 00:30' },
    { day: 'Viernes', hours: '20:00 - 00:30' },
    { day: 'Sábado', hours: '20:00 - 00:30' },
    { day: 'Domingo', hours: '20:00 - 00:30' },
  ],
};

const LocationsSection = () => {
  // Construye el src del iframe si no usás la URL completa (mapEmbedUrl).
  const builtMapSrc = `https://maps.google.com/maps?q=${siteInfo.lat},${siteInfo.lng}&z=15&output=embed`;

  const iframeSrc =
    siteInfo.mapEmbedUrl && siteInfo.mapEmbedUrl.trim() !== ''
      ? siteInfo.mapEmbedUrl
      : builtMapSrc;

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${siteInfo.lat},${siteInfo.lng}`;

  return (
    <section className="locations-section py-5">
      <div className="container">
        <div className="row gy-4 align-items-center">
          {/* Info principal */}
          <div className="col-lg-5">
            <h2 className="display-6 fw-bold mb-3">Horarios y sucursales</h2>
            <p className="text-muted">
              Encontranos en Aguilares. Abierto todos los días para que
              disfrutes nuestras hamburguesas, lomos y pizzas.
            </p>

            <div className="card shadow-sm contact-card mb-3">
              <div className="card-body">
                <h5 className="card-title mb-2">{siteInfo.name}</h5>
                <p className="mb-1">
                  <strong>Dirección:</strong> {siteInfo.addressLine1},{' '}
                  {siteInfo.city}
                </p>
                <p className="mb-1">
                  <strong>Teléfono:</strong>{' '}
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="text-decoration-none"
                  >
                    {siteInfo.phoneDisplay}
                  </a>
                </p>
                <p className="mb-1">
                  <strong>Email:</strong>{' '}
                  <a
                    href={`mailto:${siteInfo.email}`}
                    className="text-decoration-none"
                  >
                    {siteInfo.email}
                  </a>
                </p>

                <div className="mt-3 d-flex gap-2">
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-dark btn-sm"
                  >
                    Cómo llegar
                  </a>
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="btn btn-dark btn-sm"
                  >
                    Llamar ahora
                  </a>
                </div>
              </div>
            </div>

            <div className="card shadow-sm schedule-card">
              <div className="card-body">
                <h6 className="mb-3">Horarios</h6>
                <ul className="list-unstyled mb-0">
                  {siteInfo.schedule.map((s, idx) => (
                    <li
                      key={idx}
                      className="d-flex justify-content-between py-1 border-bottom"
                    >
                      <span>{s.day}</span>
                      <span className="text-muted">{s.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3 small text-muted">
              <strong>Nota:</strong> Los horarios pueden variar en feriados.
              Llamanos para confirmar.
            </div>
          </div>

          {/* Mapa */}
          <div className="col-lg-7">
            <div className="map-wrapper card overflow-hidden shadow-sm">
              <iframe
                title="Mapa - Antony's Aguilares"
                src={iframeSrc}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="mt-3 d-flex gap-2">
              <a href="#menu" className="btn btn-dark">
                Ver menú
              </a>
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;