import React, { useContext, useState, useRef, useEffect } from 'react';

import AppContext from '../../contexts/AppContext';
import CartButton from '../../components/CartButton';
import ProductList from '../../components/ProductList';
import ProductModal from '../../components/ProductModal';

import logo from '../../assets/logo.svg';

import styles from './ProductLanding.module.scss';

function ProductLanding() {
  const { addItem, products, cartItems } = useContext(AppContext);

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.count, 0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.body.classList.add('modal-open');
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.body.classList.remove('modal-open');
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <main className={styles.wrapper}>
      <CartButton
        cartQuantity={cartQuantity}
        className={styles.cartIconWrapper}
      />

      <h1 className={styles.title}>
        <img src={logo} alt="Daily deals" />
      </h1>

      <ProductList
        addItem={addItem}
        cartItems={cartItems}
        products={products}
        openModal={openModal}
      />
      <ProductModal
        product={selectedProduct}
        onClose={closeModal}
        modalRef={modalRef}
      />
    </main>
  );
}

export default ProductLanding;
