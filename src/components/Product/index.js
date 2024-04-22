import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Button from '../Button';
import Quantity from '../Quantity';

import './Product.css';

import styles from './Product.module.scss';

const Product = ({
  className,
  count = 1,
  images,
  isAdded,
  isFeatured,
  onClick,
  onDecrement,
  onIncrement,
  price,
  title,
  openModal,
  id,
  description,
}) => {
  const isInCart = onIncrement && onDecrement;
  const productClasses = cx(className, styles.product, {
    [styles.inProductLanding]: !isInCart,
    [styles.inCart]: isInCart,
    [styles.featured]: isFeatured,
    [styles.isAddable]: !isAdded,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const finalPrice = (price * count).toFixed(2);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const imagePreview = images.filter((image) => image.src.includes('-sq'));

  return (
    <div className={productClasses}>
      <img
        className={styles.image}
        src={imagePreview[selectedImageIndex].src.replace('-sq', '-rt')}
        alt={title}
        onClick={() => openModal({ title, images, price, id, description })}
      />
      <div className={styles.details}>
        <div className={styles.text}>
          <div className="product-images">
            <ul className="product-list">
              {imagePreview.map((image, index) => (
                <li key={index}>
                  <img
                    src={image.src}
                    alt={title}
                    className="image"
                    onClick={() => handleImageClick(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <h2
            className={styles.title}
            onClick={() => openModal({ title, images, price })}
          >
            {title}
          </h2>
          <span className={styles.price}>${finalPrice}</span>
        </div>
        {isInCart ? (
          <Quantity
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            count={count}
          />
        ) : (
          <Button
            className={styles.addButton}
            disabled={isAdded}
            onClick={onClick}
          >
            {isAdded ? 'Added' : 'Add to Bag'}
          </Button>
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isFeatured: PropTypes.bool,
  onClick: PropTypes.func,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Product;
