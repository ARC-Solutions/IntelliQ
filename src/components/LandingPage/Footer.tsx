import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { SiBuymeacoffee } from 'react-icons/si';
import { FaGithub } from 'react-icons/fa';
import SocialIcon from '@/components/ui/social-icon';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='flex items-center justify-center bg-transparent px-8 py-4 text-gray-600'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-center space-x-6'>
                    <SocialIcon IconComponent={FaXTwitter} url='https://twitter.com/ARCTeamGroup' />
                    <SocialIcon
                        IconComponent={FaInstagram}
                        url='https://www.instagram.com/arcteamgroup/'
                    />
                    <SocialIcon
                        IconComponent={SiBuymeacoffee}
                        url='https://www.buymeacoffee.com/arcsolutions'
                    />
                    <SocialIcon IconComponent={FaGithub} url='https://github.com/ARC-Solutions' />
                </div>
                <p className='font-archivo mt-8 text-center'>
                    Copyright © {currentYear}. ARC-Solutions. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
