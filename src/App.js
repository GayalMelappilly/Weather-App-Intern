import './App.css';
import Header from './Components/Header/Header';
import Display from './Components/Display/Display';
import Footer from './Components/Footer/Footer';



function App() {
  return (
    <div className='app h-full bg-cyan-500'>
      <Header></Header>
      <div className='container h-screen'>
        <Display></Display>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
