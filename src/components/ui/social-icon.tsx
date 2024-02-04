interface SocialIconProps {
    IconComponent: React.ComponentType<{ size: number, color: string }>;
    url: string;
}
const SocialIcon = ({ IconComponent, url }: SocialIconProps) => (
    <a href={url} className="hover:-translate-y-2 duration-300">
        <IconComponent size={32} color='text-gray-800' />
    </a>
);

export default SocialIcon;