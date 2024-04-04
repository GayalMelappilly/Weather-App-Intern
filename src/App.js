import './App.css';
import Header from './Components/Header/Header';
import Display from './Components/Display/Display';
import Footer from './Components/Footer/Footer';



function App() {
  return (
    <div className='app w-full bg-gradient-to-br from-cyan-300 to-gray-50 dark:bg-gradient-to-t dark:from-gray-700 dark:to-slate-900'>
      <div>
      {/* <div className='bg-design relative'></div> */}
      <div className='h-4'></div>
        <Header></Header>
        <div className='h-auto'>
          <Display></Display>
          <Footer></Footer>
          <div className='h-8'></div>
        </div>
      </div>
    </div>
  );
}

export default App;
