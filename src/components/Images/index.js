import propTypes from 'prop-types';
import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import styles from './Images.module.scss';
import images from '~/assets/images';

const Images = forwardRef(
  (
    {
      src = images.noImage,
      alt = 'No image',
      className = 'user-avt',
      fallback: customFallBack = images.noImage,
      ...props
    },
    ref,
  ) => {
    const [fallback, setFallback] = useState('');
    const handleError = () => {
      setFallback(customFallBack);
    };

    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={fallback || src}
        alt={alt}
        onError={handleError}
        {...props}
      />
    );
  },
);
Images.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
  className: propTypes.string,
  fallback: propTypes.string,
};
export default Images;
