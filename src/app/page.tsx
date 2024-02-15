import Particles from '@/components/particles';
import Main from '@/components/landing-page/main';
import Features from '@/components/landing-page/features';
import About from '@/components/landing-page/about';
import Contact from '@/components/landing-page/contact';
import Footer from '@/components/landing-page/footer';

export default async function Home() {
    return (
        <div className='min-h-screen bg-transparent'>
            <Particles className='absolute inset-0 -z-10 animate-fade-in' quantity={500} />
            <Main />
            <Features />
            <About />
            <Contact />
            <Footer />
        </div>
    );
}
