import Highlighted from '@/app/components/Textstyle';
import { notFound } from 'next/navigation';
import BackButton from '../../../app/components/BackButton';
import AddToCart from '@/app/components/AddToCart';
import dynamic from 'next/dynamic';

const LazyProductCard = dynamic(() => import('@/app/components/ProductCard'), {
  loading: () => <p>Loading...</p>,
});

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {next: { revalidate: 60 }}); //refresh cache (uses revalidate: performance boost, but make delay few minutes)


  if (!res.ok) return notFound();

  const product = await res.json();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="p-6">
        <BackButton />
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
          <div className="md:flex-shrink-0">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="w-full max-w-md object-cover shadow-md" 
            />
          </div>
    
          {/* Product Info */}
          <div className="mt-6 md:mt-0 flex-1">
            <h1 className="font-bold">{product.title}</h1>
            <h2 className='mb-5'> {''} <Highlighted> ${product.price} </Highlighted></h2>

            {/* Table-like info */}
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b border-gray-300">
                  <th className="py-2 pr-4 font-semibold text-gray-700 align-top">Category</th>
                  <td className="py-2 text-gray-700">{product.category.name}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-semibold text-gray-700 align-top">Description</th>
                  <td className="py-2 text-gray-700">{product.description}</td>
                </tr>
              </tbody>
            </table>

            {/* Add to Cart Component */}
            <div className="mt-6">
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>
      
      <div className='py-20'>
        <h2>Check out other good stuff</h2>
        <LazyProductCard />
      </div>
    </div>
  );
}