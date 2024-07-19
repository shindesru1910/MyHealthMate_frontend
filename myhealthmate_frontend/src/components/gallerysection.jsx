import React from 'react';

const GallerySection = () => {
  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" >
        <h2>Gallery</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      <div className="container-fluid"  data-aos-delay="100">
        <div className="row g-0">

          {/* Gallery Items */}
          {galleryItems.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <a href={item.imageUrl} className="glightbox" data-gallery="images-gallery">
                  <img src={item.imageUrl} alt={`Gallery ${index + 1}`} className="img-fluid" />
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

// Sample gallery items data
const galleryItems = [
  { imageUrl: 'assets/img/gallery/gallery-1.jpg' },
  { imageUrl: 'assets/img/gallery/gallery-2.jpg' },
  { imageUrl: 'assets/img/gallery/gallery-3.jpg' },
  { imageUrl: 'assets/img/gallery/gallery-4.jpg' },
  { imageUrl: 'assets/img/gallery/gallery-5.jpg' },
  { imageUrl: 'assets/img/gallery/gallery-6.jpg' },
  { imageUrl: 'assets/img/gallery/gallery-7.jpg' },
  { imageUrl: 'assets/img/gallery/gallery-8.jpg' }
];

export default GallerySection;
