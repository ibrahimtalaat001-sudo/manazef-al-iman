import { MagnifyingGlass } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { categories } from '../data/categories';
import { products } from '../data/products';
import './CategoryPage.css';

const ALL_BRANDS = 'all';

const sortOptions = [
  { value: 'default', label: 'الترتيب: المقترح' },
  { value: 'price-asc', label: 'الأقل سعرًا' },
  { value: 'price-desc', label: 'الأعلى سعرًا' },
  { value: 'best', label: 'الأكثر مبيعًا' },
  { value: 'newest', label: 'الأحدث' },
];

function sortProducts(list, sort) {
  const sorted = [...list];
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  if (sort === 'best') sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
  if (sort === 'newest') sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return sorted;
}

export default function CategoryPage() {
  const { slug } = useParams();
  // Keying on the slug resets every filter when the shopper switches category.
  return <CategoryListing key={slug} slug={slug} />;
}

function CategoryListing({ slug }) {
  const category = categories.find((c) => c.slug === slug);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState(ALL_BRANDS);
  const [sort, setSort] = useState('default');

  const baseProducts = useMemo(() => {
    if (slug === 'offers') return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
    if (!category) return [];
    return products.filter((p) => p.category === category.id);
  }, [slug, category]);

  const brands = useMemo(() => [...new Set(baseProducts.map((p) => p.brand))].sort(), [baseProducts]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const matches = baseProducts.filter((p) => {
      if (brand !== ALL_BRANDS && p.brand !== brand) return false;
      if (!term) return true;
      return p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term);
    });
    return sortProducts(matches, sort);
  }, [baseProducts, search, brand, sort]);

  const hasActiveFilters = search.trim() !== '' || brand !== ALL_BRANDS;
  const clearFilters = () => {
    setSearch('');
    setBrand(ALL_BRANDS);
  };

  if (!category) {
    return (
      <div className="container section">
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true"><MagnifyingGlass weight="duotone" /></div>
          <h3>القسم غير موجود</h3>
          <p>ارجع للرئيسية واختر قسمًا من القائمة.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <nav className="breadcrumb" aria-label="مسار التنقل">
          <Link to="/">الرئيسية</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{category.name}</span>
        </nav>
        <header className="page-head">
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </header>

        <div className="listing-toolbar">
          <label className="listing-search">
            <MagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`ابحث في ${category.name}`}
              aria-label={`البحث في ${category.name}`}
            />
          </label>
          <select
            className="listing-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="ترتيب المنتجات"
          >
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {brands.length > 1 && (
          <div className="brand-chips" role="group" aria-label="تصفية حسب الماركة">
            {[ALL_BRANDS, ...brands].map((b) => (
              <button
                key={b}
                type="button"
                className={`chip ${brand === b ? 'active' : ''}`}
                aria-pressed={brand === b}
                onClick={() => setBrand(b)}
              >
                {b === ALL_BRANDS ? 'كل الماركات' : b}
              </button>
            ))}
          </div>
        )}

        <div className="results-bar">
          <p aria-live="polite">{filtered.length} منتج</p>
          {hasActiveFilters && (
            <button type="button" className="link-btn" onClick={clearFilters}>مسح التصفية</button>
          )}
        </div>

        <ProductGrid
          products={filtered}
          emptyMessage="جرّب كلمة أخرى أو اختر كل الماركات."
        />
      </div>
    </section>
  );
}
