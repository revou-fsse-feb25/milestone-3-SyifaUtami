import Header from './components/Header';
import Highlighted from "./components/Textstyle";
import ProductCard from './components/ProductCard';
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div>
        <Header />
        <div className="p-5">
    </div>
    <div className='text-center py-2 px-3'>
        <h1>See our {''} <Highlighted> Stolen goods </Highlighted> </h1>
        <p> Check out the catalog of (not our) products that we sell. Definitely cheaper than if you buy it in store. </p>
    </div>
    <main className="py-2 px-8">
      <h2> Recently lifted </h2>
      <ProductCard />
    </main>
    <footer><Footer/></footer>
    </div>
    
    );
  }