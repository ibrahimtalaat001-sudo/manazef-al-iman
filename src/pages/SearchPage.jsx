import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MagnifyingGlass } from '@phosphor-icons/react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { categories } from '../data/categories';
import './SearchPage.css';

function findProducts(query) {
  const term = query.toLowerCase();
  return products.filter((p) => {
    const category = categories.find((c) => c.id === p.category);
    return (
      p.name.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term) ||
      (category && category.name.toLowerCase().includes(term))
    );
  });
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const results = useMemo(() => (q ? findProducts(q) : []), [q]);

  return (
    <section className="page">
      <div className="container">
        <nav className="breadcrumb" aria-label="مسار التنقل">
          <Link to="/">الرئيسية</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">البحث</span>
        </nav>
        <header className="page-head">
          <h1>{q ? `نتائج «${q}»` : 'البحث'}</h1>
        </header>

        {/* Keyed on the URL query so the box shows the new term after a header search. */}
        <SearchBox key={q} initialQuery={q} onSearch={(term) => setParams(term ? { q: term } : {})} />

        {q && (
          <div className="results-bar">
            <p aria-live="polite">{results.length} منتج</p>
          </div>
        )}
        {q ? (
          <ProductGrid products={results} emptyMessage="جرّب اسم ماركة أو كلمة أقصر." />
        ) : (
          <p className="search-hint">اكتب اسم المنتج أو الماركة، مثل «بريل» أو «أريال».</p>
        )}
      </div>
    </section>
  );
}

function SearchBox({ initialQuery, onSearch }) {
  const [term, setTerm] = useState(initialQuery);
  return (
    <form
      className="listing-toolbar"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(term.trim());
      }}
    >
      <label className="listing-search">
        <MagnifyingGlass aria-hidden="true" />
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="ابحث عن منتج أو ماركة..."
          aria-label="البحث في المتجر"
          autoFocus={!initialQuery}
        />
      </label>
      <button type="submit" className="btn btn-primary search-submit">بحث</button>
    </form>
  );
}
