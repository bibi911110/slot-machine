import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Features />
            </main>
            <Footer />
        </>
    )
}

export default HomePage;