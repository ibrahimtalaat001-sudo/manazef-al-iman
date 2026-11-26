export const categories = [
  {
    id: 'cosmetics',
    name: 'مستحضرات تجميل',
    slug: 'cosmetics',
    description: 'منتجات عناية شخصية وتجميل مختارة بعناية لمنزلك وعائلتك.',
    icon: 'sparkle',
    image: 'https://images.unsplash.com/photo-1779056904689-ff99fd0045a4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cleaners',
    name: 'منظفات',
    slug: 'cleaners',
    description: 'منظفات منزلية فعالة لكل ركن في بيتك.',
    icon: 'bottle',
    image: 'https://images.unsplash.com/photo-1626379481874-3dc5678fa8ca?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'industrial',
    name: 'منظفات صناعية',
    slug: 'industrial',
    description: 'حلول تنظيف قوية للاستخدامات المهنية والمصانع والمنشآت.',
    icon: 'factory',
    image: 'https://images.unsplash.com/photo-1744681984533-ce43dce4cc70?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'groceries',
    name: 'جردوات',
    slug: 'groceries',
    description: 'مستلزمات يومية ومنتجات جردوات بجودة عالية وأسعار مناسبة.',
    icon: 'basket',
    image: 'https://images.unsplash.com/photo-1577369117918-7e3785e39cb7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'wholesale',
    name: 'قسم الجملة',
    slug: 'wholesale',
    description: 'اشترِ بالكراتين ووفر أكثر مع أسعار الجملة المميزة.',
    icon: 'box',
    image: 'https://images.unsplash.com/photo-1513672494107-cd9d848a383e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'offers',
    name: 'عروض الجمعة',
    slug: 'offers',
    description: 'عروض وخصومات خاصة لفترة محدودة على منتجات مختارة.',
    icon: 'tag',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));
