import ProductSearch from '@/app/components/ProductSearch';
import Link from 'next/link';


export default async function AdminProducts({ searchParams }) {
    console.log("🎯 PAGE searchParams:", searchParams);
    
    return (
      <div>
        <Link href="/admin/products/add" className="px-4 py-2 bg-[#1C1C1C] text-white rounded-lg hover:bg-[#1ceff4] hover:text-[#1C1C1C] transition-colors font-medium"> Add New Product </Link>
        <ProductSearch searchParams={searchParams} />
      </div>
    );
}
