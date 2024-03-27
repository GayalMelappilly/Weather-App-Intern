import './App.css';
import Header from './Components/Header/Header';
import Display from './Components/Display/Display';
import Footer from './Components/Footer/Footer';



function App() {
  return (
    <div className='app w-full bg-gradient-to-br from-cyan-300 to-gray-50'>
      <div className='container'>
      {/* <div className='bg-design relative'></div> */}
        <Header></Header>
        <div className='h-screen'>
          <Display></Display>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default App;
