import { Link } from 'react-router-dom';
import { Package, Truck, WhatsappLogo } from '@phosphor-icons/react';
import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1>كل احتياجات بيتك في مكان واحد</h1>
          <p>اكتشف مجموعة متنوعة من المنظفات ومستحضرات التجميل بأسعار مميزة.</p>
          <div className="hero-actions">
            <Link to="/category/cleaners" className="btn btn-primary">تسوق الآن</Link>
            <Link to="/category/offers" className="btn btn-outline">شاهد العروض</Link>
          </div>
          <ul className="hero-facts">
            <li><Package aria-hidden="true" />جملة وقطاعي</li>
            <li><Truck aria-hidden="true" />توصيل داخل محافظتك</li>
            <li><WhatsappLogo aria-hidden="true" />الطلب عبر واتساب</li>
          </ul>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80"
            alt="منتجات تنظيف ومنظفات منزلية"
          />
        </div>
      </div>
    </section>
  );
}
