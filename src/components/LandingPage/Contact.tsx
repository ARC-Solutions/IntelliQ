import Link from "next/link";
import {Button} from "@/components/ui/button";

const Contact = () => {
    return (
        <section className="flex flex-col items-center justify-center px-8 py-16 space-y-8 bg-transparent"
                 id="contact">
            <h2 className="text-4xl font-bold text-center">Contact Us</h2>
            <p className="text-lg text-center max-w-lg">Have any questions or feedback? We&apos;d love to hear from
                you.</p>
            <Link
                href='mailto:contact@arc-solutions.xyz'>
                <Button className="bg-[#c8b6ff] text-[#040404] px-8 py-2 rounded">Contact Us</Button>
            </Link>
        </section>
    )
};

export default Contact;