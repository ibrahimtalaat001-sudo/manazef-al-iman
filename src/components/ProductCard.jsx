import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';
import { formatEGP } from '../utils/format';
import { getDiscountPercent } from '../data/offers';
import './ProductCard.css';

const ADDED_FEEDBACK_MS = 1500;

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = getDiscountPercent(product);
  const [isJustAdded, setIsJustAdded] = useState(false);

  useEffect(() => {
    if (!isJustAdded) return undefined;
    const timer = setTimeout(() => setIsJustAdded(false), ADDED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [isJustAdded]);

  const handleAdd = () => {
    addItem(product, 1);
    setIsJustAdded(true);
  };

  const buttonLabel = !product.available ? 'غير متوفر' : isJustAdded ? 'تمت الإضافة' : 'أضف للسلة';

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-image-wrap">
        <img src={product.image} alt={product.name} className="product-card-image" loading="lazy" />
        {discount > 0 && <span className="badge badge-discount product-card-badge">خصم {discount}%</span>}
        {!product.available && <span className="badge badge-out product-card-badge">غير متوفر</span>}
      </Link>
      <div className="product-card-body">
        <p className="product-card-brand">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="product-card-name">
          <h3>{product.name}</h3>
        </Link>
        <div className="product-card-pricing">
          <span className="product-card-price price">{formatEGP(product.price)}</span>
          {product.originalPrice ? (
            <span className="product-card-old price">{formatEGP(product.originalPrice)}</span>
          ) : null}
        </div>
        <p className="product-card-unit">
          {`لكل ${product.unit}`}
        </p>
        <button
          type="button"
          className={`btn btn-primary product-card-btn ${isJustAdded ? 'is-added' : ''}`}
          onClick={handleAdd}
          disabled={!product.available}
          aria-live="polite"
        >
          {isJustAdded && <Check weight="bold" aria-hidden="true" />}
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}
