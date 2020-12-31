import './App.css'
import NavBar from './NavBar.js'
import SlideShow from './SlideShow.js'
import listOfImages from './defaultSlides'

function App() {
  return (
    <div>
      <NavBar/>
      <SlideShow slides={listOfImages}/>
    </div>
  );
}

export default App;