import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose, modalRef }) => {
  console.log(product);
  return (
    <>
      {product && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <button className="close" onClick={onClose}>
                &times;
              </button>
              <div className="modal-info">
                <h2 className="modal-title">{product.title}</h2>
                <img
                  src={product.images[0].src}
                  alt={product.title}
                  className="modal-image"
                />
                <p className="modal-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
