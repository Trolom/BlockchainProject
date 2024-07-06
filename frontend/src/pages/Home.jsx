import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Cliens from "../components/Cliens";
import AboutUs from "../components/AboutUs";
import WhyUs from "../components/WhyUs";
import Skills from "../components/Skills";
import Services from "../components/Services";
import Cta from "../components/Cta";
import Faq from "../components/Faq";
import FooterBottom from "../components/FooterBottom";
import FooterTop from "../components/FooterTop";

function Home() {
    return (
        <div>
            <header id="header" className="fixed-top ">
                    <Navbar />
            </header>
            <section id="hero" className="d-flex align-items-center">
                <Hero/>
            </section>
            <main id="main">
                <Cliens/>
                <AboutUs/>         
                <WhyUs/>
                <Skills/>
                <Services/>
                <Cta/>
                <Faq/>
            </main>
            <footer id="footer">
                <FooterTop/>
                <FooterBottom/>
            </footer>
        </div>
    );
}

export default Home;
