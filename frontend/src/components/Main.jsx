import React from 'react'
import FoodGallery from './FoodGallery'
import Welcome from './Welcome';

const Main = () => {
  return (
    <>
      <div className="container-fluid" style={{ background: '#F0F0F0' }}>
        <div class="row">
          <div class="col-12 col-md-6 text-white p-3">
            <Welcome/>
          </div>

          <div
            class="col-12 col-md-6 text-white p-4"
            style={{ background: '#FFFBE9' }}
          >
            <FoodGallery/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main