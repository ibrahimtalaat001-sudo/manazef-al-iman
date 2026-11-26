import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatEGP } from '../utils/format';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { Minus, Plus, ShoppingCart, Trash, WhatsappLogo } from '@phosphor-icons/react';
import './CartPage.css';

export default function CartPage() {
  const { items, total, itemCount, removeItem, updateQty, clearCart } = useCart();

  const handleWhatsApp = () => {
    if (!items.length) return;
    const url = buildWhatsAppUrl(items, total);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section className="page">
        <div className="container">
          <header className="page-head">
            <h1>سلة التسوق</h1>
            {items.length > 0 && <p>راجع الكميات، ثم أرسل الطلب على واتساب لتأكيد التوصيل.</p>}
          </header>
          {!items.length ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true"><ShoppingCart weight="duotone" /></div>
              <h3>سلة التسوق فارغة</h3>
              <p>لم تقم بإضافة أي منتجات بعد. تصفح الأقسام واختر ما يناسبك.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>متابعة التسوق</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                <div className="cart-items-head">
                  <span>المنتجات ({itemCount})</span>
                  <button type="button" className="cart-clear" onClick={clearCart}>تفريغ السلة</button>
                </div>

                {items.map((item) => {
                  const lineTotal = item.price * item.quantity;
                  return (
                    <div className="cart-item" key={item.id}>
                      <Link to={`/product/${item.id}`} className="cart-item-image">
                        <img src={item.image} alt={item.name} />
                      </Link>
                      <div className="cart-item-info">
                        <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                        <p className="cart-item-unit">{formatEGP(item.price)} / {item.unit}</p>
                        <div className="cart-item-controls">
                          <div className="qty-control">
                            <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="تقليل الكمية"><Minus weight="bold" /></button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQty(item.id, Math.max(1, Number(e.target.value) || 1))}
                              aria-label={`كمية ${item.name}`}
                            />
                            <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="زيادة الكمية"><Plus weight="bold" /></button>
                          </div>
                          <button type="button" className="cart-remove" onClick={() => removeItem(item.id)}><Trash aria-hidden="true" />حذف</button>
                        </div>
                      </div>
                      <div className="cart-item-total">
                        <span className="price">{formatEGP(lineTotal)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <aside className="cart-summary">
                <h2>ملخص الطلب</h2>
                <div className="summary-row">
                  <span>عدد القطع</span>
                  <span>{itemCount}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>الإجمالي</span>
                  <span className="price">{formatEGP(total)}</span>
                </div>
                <p className="summary-note">تكلفة التوصيل تُحدد على واتساب حسب منطقتك.</p>
                <button type="button" className="btn btn-primary whatsapp-btn" onClick={handleWhatsApp}>
                  <WhatsappLogo weight="bold" aria-hidden="true" />
                  إتمام الطلب عبر واتساب
                </button>
                <Link to="/" className="btn btn-ghost" style={{ width: '100%' }}>متابعة التسوق</Link>
              </aside>

              <div className="cart-checkout-bar">
                <div>
                  <span>الإجمالي</span>
                  <strong className="price">{formatEGP(total)}</strong>
                </div>
                <button type="button" className="btn btn-primary whatsapp-btn" onClick={handleWhatsApp}>
                  <WhatsappLogo weight="bold" aria-hidden="true" />
                  اطلب عبر واتساب
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
