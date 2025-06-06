import Image from 'next/image';
import Link from 'next/link';

export default function Unauthorized() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="font-bold mb-4 text-red-500">Access Denied</h1>
        
        <Image 
          src="/patrick.gif" 
          alt="Patrick" 
          width={300} 
          height={300} 
          className="object-cover"
        />
  
        <h2 className="pt-5">This is not where you should be.</h2>
        <p className="mb-6 p-3">Please return to our store. We have a bunch of good stuff waiting for you!</p>
  
        <Link href="/" className="bg-[#1ceff4] hover:bg-[#1C1C1C] hover:text-[#1ceff4] text-[#1C1C1C] px-6 py-2 rounded">
          Go Back to Store
        </Link>
        <Link href="/login" className='text-gray-500 p-7 hover:text-black'> admin login </Link>
      </div>
    );
  }