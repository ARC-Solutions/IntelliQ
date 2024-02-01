import Particles from "@/components/Particles";
import Main from "@/components/LandingPage/Main";
import Features from "@/components/LandingPage/Features";
import About from "@/components/LandingPage/About";
import Contact from "@/components/LandingPage/Contact";
import Footer from "@/components/LandingPage/Footer";

export default async function Home() {
    return (
        <div className="min-h-screen bg-transparent">
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={500}
            />
            <Main/>
            <Features/>
            <About/>
            <Contact/>
            <Footer/>
        </div>
    )
}