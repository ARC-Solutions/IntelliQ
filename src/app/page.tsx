import Particles from '@/components/particles';
import Main from '@/components/LandingPage/main';
import Features from '@/components/LandingPage/features';
import About from '@/components/LandingPage/about';
import Contact from '@/components/LandingPage/contact';
import Footer from '@/components/LandingPage/footer';

export default async function Home() {
    return (
        <div className='min-h-screen bg-transparent'>
            <Particles className='animate-fade-in absolute inset-0 -z-10' quantity={500} />
            <Main />
            <Features />
            <About />
            <Contact />
            <Footer />
        </div>
    );
}
