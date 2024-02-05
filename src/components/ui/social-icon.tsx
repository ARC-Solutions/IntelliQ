interface SocialIconProps {
    IconComponent: React.ComponentType<{ size: number; color: string }>;
    url: string;
}
const SocialIcon = ({ IconComponent, url }: SocialIconProps) => (
    <a href={url} className='duration-300 hover:-translate-y-2'>
        <IconComponent size={32} color='text-gray-800' />
    </a>
);

export default SocialIcon;
