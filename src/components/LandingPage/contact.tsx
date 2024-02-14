import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Contact = () => {
    return (
        <section
            className='flex flex-col items-center justify-center space-y-8 bg-transparent px-8 py-16'
            id='contact'
        >
            <h2 className='text-center text-4xl font-bold'>Contact Us</h2>
            <p className='max-w-lg text-center text-lg'>
                Have any questions or feedback? We&apos;d love to hear from you.
            </p>
            <Link href='mailto:contact@arc-solutions.xyz'>
                <Button className='rounded bg-[#c8b6ff] px-8 py-2 text-[#040404]'>
                    Contact Us
                </Button>
            </Link>
        </section>
    );
};

export default Contact;
