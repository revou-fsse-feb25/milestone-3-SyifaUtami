export default function Highlighted({ children }) {
  return (
    <span className='bg-[linear-gradient(180deg,rgba(255,255,255,0)_50%,_#1ceff4_50%)]'> 
      {children}
    </span>
  );
}