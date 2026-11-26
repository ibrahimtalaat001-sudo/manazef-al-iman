import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import { formatEGP } from '../utils/format';
import { getDiscountPercent } from '../data/offers';
import { Minus, Package, Plus, ShoppingCart } from '@phosphor-icons/react';
import ProductGrid from '../components/ProductGrid';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const related = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true"><Package weight="duotone" /></div>
          <h3>المنتج غير موجود</h3>
          <p>قد يكون المنتج تم حذفه أو الرابط غير صحيح.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const discount = getDiscountPercent(product);

  const handleAdd = () => {
    if (!product.available) return;
    addItem(product, qty);
  };

  return (
    <>
      <section className="page">
        <div className="container">
          <nav className="breadcrumb" aria-label="مسار التنقل">
            <Link to="/">الرئيسية</Link>
            {category && <><span aria-hidden="true">/</span><Link to={`/category/${category.slug}`}>{category.name}</Link></>}
          </nav>
          <div className="product-details">
            <div className="product-details-image">
              <img src={product.image} alt={product.name} />
              {discount > 0 && <span className="badge badge-discount detail-badge">خصم {discount}%</span>}
            </div>
            <div className="product-details-info">
              <p className="detail-brand">{product.brand}</p>
              <h1>{product.name}</h1>
              <div className="detail-pricing">
                <span className="detail-price price">{formatEGP(product.price)}</span>
                {product.originalPrice ? <span className="detail-old price">{formatEGP(product.originalPrice)}</span> : null}
              </div>
              <p className="detail-unit">وحدة البيع: <strong>{product.unit}</strong> {product.unitType === 'wholesale' ? '(سعر الكرتونة كاملة)' : '(سعر الوحدة)'}</p>
              {product.cartonSize ? (
                <p className="detail-unit">محتوى الكرتونة: <strong>{product.cartonSize} عبوة</strong></p>
              ) : null}
              <p className={`detail-availability ${product.available ? 'ok' : 'no'}`}>
                {product.available ? 'متوفر في المخزون' : 'غير متوفر حاليًا'}
              </p>
              <p className="detail-desc">{product.description}</p>

              <div className="detail-actions">
                <div className="qty-control" aria-label="تحديد الكمية">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="تقليل الكمية"><Minus weight="bold" /></button>
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                    aria-label="الكمية"
                  />
                  <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="زيادة الكمية"><Plus weight="bold" /></button>
                </div>
                <button type="button" className="btn btn-primary detail-add" onClick={handleAdd} disabled={!product.available}>
                  {product.available && <ShoppingCart weight="bold" aria-hidden="true" />}
                  {product.available ? 'أضف إلى السلة' : 'غير متوفر'}
                </button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="related-section">
              <div className="section-header">
                <div>
                  <h2 className="section-title">منتجات ذات صلة</h2>
                  <p className="section-subtitle">منتجات أخرى قد تهمك من نفس القسم.</p>
                </div>
              </div>
              <ProductGrid products={related} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
