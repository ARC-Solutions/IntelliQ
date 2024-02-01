import {FaInstagram, FaXTwitter} from "react-icons/fa6";
import {SiBuymeacoffee} from "react-icons/si";
import {FaGithub} from "react-icons/fa";

interface SocialIconProps {
    IconComponent: React.ComponentType<{ size: number, color: string }>;
    url: string;
}
const SocialIcon = ({ IconComponent, url }: SocialIconProps) => (
    <a href={url} className="hover:-translate-y-2 duration-300">
        <IconComponent size={32} color='text-gray-800' />
    </a>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="flex items-center justify-center px-8 py-4 bg-transparent text-gray-600">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex justify-center space-x-6">
                    <SocialIcon IconComponent={FaXTwitter} url="https://twitter.com/ARCTeamGroup"/>
                    <SocialIcon IconComponent={FaInstagram} url="https://www.instagram.com/arcteamgroup/"/>
                    <SocialIcon IconComponent={SiBuymeacoffee} url="https://www.buymeacoffee.com/arcsolutions"/>
                    <SocialIcon IconComponent={FaGithub} url="https://github.com/ARC-Solutions"/>
                </div>
                <p className="mt-8 text-center font-archivo">
                    Copyright © {currentYear}. ARC-Solutions. All rights reserved.
                </p>
            </div>

        </footer>
    )
};

export default Footer;