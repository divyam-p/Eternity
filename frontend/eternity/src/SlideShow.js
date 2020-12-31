// import image1 from './assets/slideShow/1.jpg'
// import image2 from './assets/slideShow/2.jpg'
// import image3 from './assets/slideShow/3.jpg'
import './SlideShow.css'
import React from 'react'
import { useState, useEffect, useCallback} from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

//https://scrimba.com/scrim/cpqd9rta

function SlideShow({slides}){  
    const [current, setCurrent] = useState(0); 
    const [check, setCheck] = useState(true); 
    const length = slides.length; 

    const goToNext = useCallback(() => { 
        setCurrent(current === length - 1 ? 0 : current + 1); 
        setCheck(true); 
    }, [current, length])

    const goToBack = () => { 
        setCurrent(current === 0 ? length - 1 : current - 1); 
    }

    useEffect(() => {
        console.log("HIIII"); 
        if(check){
            setTimeout(goToNext, 10000); 
            setCheck(true); 
            return function(){ 
                clearTimeout(goToNext); 
            }
        } 
     }, [check, goToNext, setCheck])

    if(!Array.isArray(slides) || slides.length <= 0){ 
        return null; 
    }

    return(
        <section className="slider"> 
            {slides.map((s, i) => 
            (
                <div className={i === current ? "slide active" : "slide"} 
                    key={s.title}
                    aria-hidden={i !== current}>
                    <div className="arrowAlignment">
                        <div> 
                            <IoIosArrowBack  onClick={() => {goToBack(); setCheck(false)}} id="arrowLeft"/>
                        </div>
                        <div>
                            <h1>{s.title}</h1>
                            <h2>{s.subtitle}</h2>
                        </div>
                        <div>
                            <IoIosArrowForward onClick={() => {goToNext(); setCheck(false)}} id="arrowRight"/> 
                        </div>
                    </div>
                    {i === current && (
                        <img className="image" src={s.image} alt="something"/>
                    )}
                    
                </div>
            ))}
        </section>
    );
}

//IoIosArrowForward
//IoIosArrowBack
export default SlideShow