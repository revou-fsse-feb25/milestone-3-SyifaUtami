
import Image from 'next/image';

export default function Header() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/heading.jpg"
        alt="Welcome Banner"
        fill
        className="object-cover"
        priority
      />
     <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center pl-20">
            <h1 className="text-white text-2xl md:text-xl font-helvetica font-italics">
                Thievery made cool. 
            </h1>
        </div>
    </div>
  );
}