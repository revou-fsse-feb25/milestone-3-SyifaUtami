import Link from 'next/link'
import { FaMask, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function NavBar() {
    return (
      <nav className="bg-[#1C1C1C] text-white px-4 md:px-8 py-4 flex justify-between items-center shadow-md">
        {/* Left side: logo and links */}
        <div className="flex items-center space-x-8">
        <div className="text-xl font-bold flex items-center space-x-2">
          <Link href="/" className="text-[#1ceff4] flex items-center space-x-2">
            <span>Shoplifter</span>
            <FaMask className="h-6 w-6 text-[#1ceff4]" />
          </Link>
        </div>
          <ul className="flex space-x-6 text-sm md:text-base">
            <li>
              <Link href="/" className="hover:underline">Home</Link> {/* go to src/app/page.js */}
            </li>
            <li>
              <Link href="/about" className="hover:underline">About</Link> {/* go to src/app/about/page.js */}
            </li>
          </ul>
        </div>
        
      {/*cart icon stuff*/}
      <div className="flex items-center space-x-10">
        <Link href="/cart" className="hover:text-[#1ceff4]">
          <FaShoppingCart className="h-6 w-6" />
        </Link>
      <Link href="/dashboard" className="hover:text-[#1ceff4]">
        <FaUser className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
}