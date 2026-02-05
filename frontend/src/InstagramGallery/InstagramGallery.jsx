import "./InstagramGallery.css";

const images = [
  "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  "https://torado.envytheme.com/men-fashion-wear/default/assets/images/instagram/instagram2.jpg",
  "https://torado.envytheme.com/men-fashion-wear/default/assets/images/instagram/instagram3.jpg",
  "https://torado.envytheme.com/men-fashion-wear/default/assets/images/instagram/instagram4.jpg",
  "https://torado.envytheme.com/men-fashion-wear/default/assets/images/instagram/instagram5.jpg",
  "https://torado.envytheme.com/men-fashion-wear/default/assets/images/instagram/instagram6.jpg",
];

const brands = [
  "Fabulas",
  "EnvyTheme",
  "Rentoor",
  "Medeval",
  "PANON",
  "HiBootstrap",
];

export default function InstagramGallery() {
  return (
    <section className="insta-section">
      <div className="insta-container">
        <h2>Torado Instagram Gallery Post</h2>

        {/* IMAGE GRID */}
        <div className="insta-grid">
          {images.map((img, index) => (
            <div className="insta-item" key={index}>
              <img src={img} alt="Instagram post" />

              <div className="insta-overlay">
                <span className="insta-icon">
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* BRANDS */}
        <div className="insta-brands">
          {brands.map((brand, index) => (
            <span key={index}>{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
