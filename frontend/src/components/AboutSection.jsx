const AboutSection = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row align-items-center gy-4">
          <div className="col-md-6">
            <h2 className="display-6 fw-bold mb-3">Quiénes somos</h2>
            <p className="lead text-muted">
              Somos <strong>Antony's</strong>, un local de comida artesanal
              nacido en Aguilares. Desde 2018 cocinamos con recetas familiares y
              productos locales para brindar sabores auténticos y calidez en
              cada plato.
            </p>

            <h5 className="mt-4">Nuestra historia</h5>
            <p className="text-muted small">
              Comenzamos como un puesto en la feria local y con el apoyo de la
              comunidad abrimos nuestro primer local en 2020. En 2023
              incorporamos reparto a domicilio para que nuestras hamburguesas,
              lomos y pizzas lleguen siempre calientes.
            </p>

            <div className="row">
              <div className="col-6">
                <h6 className="mb-1">Misión</h6>
                <p className="small text-muted">
                  Comida rica, rápida y accesible usando ingredientes frescos.
                </p>
              </div>
              <div className="col-6">
                <h6 className="mb-1">Valores</h6>
                <p className="small text-muted">
                  Calidad, cercanía y compromiso con Aguilares.
                </p>
              </div>
            </div>

            <div className="mt-3">
              <button className="btn btn-dark me-2">Ver menú</button>
              <button className="btn btn-outline-dark">Contacto</button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 overflow-hidden">
              <img
                src="https://elgourmet-assets.s3.amazonaws.com/wp-content/uploads/2023/03/al8czp9o56_tucumanodemilanesa.jpg"
                alt="Plato - Antony's"
                className="img-fluid about-img"
              />
            </div>
            <div className="mt-3 d-flex gap-2">
              <div className="small-card p-2 flex-fill rounded">
                <h6 className="mb-1">2018</h6>
                <p className="mb-0 small text-muted">Nace en la feria local</p>
              </div>
              <div className="small-card p-2 flex-fill rounded">
                <h6 className="mb-1">2020</h6>
                <p className="mb-0 small text-muted">
                  Apertura del primer local
                </p>
              </div>
              <div className="small-card p-2 flex-fill rounded">
                <h6 className="mb-1">2023</h6>
                <p className="mb-0 small text-muted">
                  Comienza reparto a domicilio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
