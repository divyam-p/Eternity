import './App.css'
import NavBar from './NavBar.js'
import SlideShow from './SlideShow.js'
import listOfImages from './defaultSlides.js'
import Products from './Products.js' 
import listOfProducts from './defaultProducts.js'



function App() {
  return (
    <div className="main">
      <NavBar/>
      <SlideShow slides={listOfImages}/>
      <Products products={listOfProducts}/> 
    </div>
  );
}

export default App;