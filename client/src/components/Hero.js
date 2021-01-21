import React from 'react';
import slotHero from '../images/slotHero.png';

const Hero = () => {
    return (
        <section className='hero'>
            <div className='hero-center'>
                <article className='hero-info'>
                    <h1>
                        Welcome to the slot game site.
                    </h1>
                    <p>
                        Please register to play or login to continue
                    </p>
                    <button className='btn'>Register</button>
                    
                </article>
                <article className='hero-images'>
                    <img src={slotHero} className='header-img' alt='slot-machone-game' />
                </article>
            </div>
        </section>
    )
}

export default Hero;