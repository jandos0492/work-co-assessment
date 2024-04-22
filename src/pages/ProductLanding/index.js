import React, { useContext, useState, useRef } from 'react';

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
        closeModal={closeModal}
        modalRef={modalRef}
        isModalOpen={isModalOpen}
      />
    </main>
  );
}

export default ProductLanding;
