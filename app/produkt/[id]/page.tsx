import { Metadata } from 'next';
import products from '@/data/products.json';
import ProductDetail from './ProductDetail';
import TopBar from '@/components/TopBar';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return { title: 'Produkt nicht gefunden' };
  }

  return {
    title: `${product.name} | Guthabenkarten.ch`,
    description: product.description.de,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Produkt nicht gefunden</h1>
          <a href="/" className="text-blue-400 hover:text-blue-300 underline">
            Zurück zur Startseite
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <TopBar />
      <ProductDetail product={product} />
    </div>
  );
}
