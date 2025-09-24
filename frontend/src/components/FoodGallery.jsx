import React from 'react';

const FoodGallery = () => {
  return (
    <>
      <div
        class="col-12 rounded-5 mx-auto py-3 px-4"
        style={{
          background: '#303841',
        }}
      >
        <div class="row gap-3">
          <div
            class="rounded-4 col-6 d-flex align-items-center justify-content-center p-2"
            style={{
              background: '#222831',
            }}
          >
            <img
              class="rounded-4 img-fluid"
              src="https://media.istockphoto.com/id/495204032/photo/fresh-tasty-burger.jpg?s=612x612&w=0&k=20&c=k6X_gSHlo-WdKsqTnfBjoEbjdhrlz6RNhUs23ivpIxk="
              alt="Burger"
            />
          </div>
          <div
            class="rounded-4 col d-flex align-items-center justify-content-center p-2"
            style={{
              background: '#222831',
            }}
          >
            <img
              class="rounded-4 img-fluid"
              src="https://estacionpalero.com.ar/wp-content/uploads/2024/09/LOMO-ESPECIAL-Y-PAPAS.webp"
              alt="Sandwich"
            />
          </div>
        </div>

        <div class="row mt-3">
          <div
            class="rounded-4 col-12 d-flex align-items-center justify-content-center p-2"
            style={{
              background: '#222831',
            }}
          >
            <img
              class="rounded-4 img-fluid"
              src="https://www.paulinacocina.net/wp-content/uploads/2023/03/pizza-casera.jpg"
              alt="Pizza"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodGallery;