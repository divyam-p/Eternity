import './SlideShow.css'
import React from 'react'
import { useState, useEffect, useCallback} from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { IoIosArrowForward } from 'react-icons/io'

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
                            <h1 className="slideshowProductInfo">{s.title}</h1>
                            <h2 className="slideshowProductInfo">{s.subtitle}</h2>
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

export default SlideShow