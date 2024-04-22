import React, { useState, useEffect } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, closeModal, modalRef, isModalOpen }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const handleBodyClass = () => {
      if (isModalOpen) {
        document.body.classList.add('modal-open-body');
      } else {
        document.body.classList.remove('modal-open-body');
      }
    };

    handleBodyClass();

    return () => {
      document.body.classList.remove('modal-open-body');
    };
  }, [isModalOpen]);

  let imagePreview = [];

  if (product) {
    imagePreview = product.images.filter((image) => image.src.includes('-sq'));
  }

  return (
    <>
      {product && isModalOpen && (
        <div className="modal-open">
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <button className="close" onClick={closeModal}>
                &times;
              </button>
              <div className="modal-info">
                <div className="modal-info-1">
                  <h2 className="modal-title">{product.title}</h2>
                  <img
                    src={imagePreview[selectedImageIndex].src}
                    alt={product.title}
                    className="modal-image"
                  />
                  <p className="modal-price">${product.price.toFixed(2)}</p>
                </div>
                <div className="modal-info-2">
                  <ul className="product-modal-list">
                    {imagePreview.map((image, index) => (
                      <li key={index}>
                        <img
                          src={image.src}
                          alt={product.title}
                          className="product-modal-image"
                          onClick={() => handleImageClick(index)}
                        />
                      </li>
                    ))}
                  </ul>
                  <p className="product-modal-description">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
