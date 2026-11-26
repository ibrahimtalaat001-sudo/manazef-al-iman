import { Basket } from '@phosphor-icons/react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, emptyMessage = 'لا توجد منتجات مطابقة.' }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true"><Basket weight="duotone" /></div>
        <h3>لا توجد منتجات</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
