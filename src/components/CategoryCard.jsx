import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { offerProducts } from '../data/offers';
import './CategoryCard.css';

function countProducts(category) {
  if (category.slug === 'offers') return offerProducts.length;
  return products.filter((p) => p.category === category.id).length;
}

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <div className="category-card-image">
        <img src={category.image} alt="" loading="lazy" />
      </div>
      <div className="category-card-body">
        <h3>{category.name}</h3>
        <span>{countProducts(category)} منتج</span>
      </div>
    </Link>
  );
}
