'use client'; // Ensure this is a Client Component
import Image from 'next/image';
interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  logoSrc: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, link, logoSrc }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
      <Image src={logoSrc} alt={`${title} logo`} className="h-16 w-16 mb-4" />
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary font-semibold hover:underline"
      >
        Visit {title}
      </a>
    </div>
  );
};

export default ResourceCard;
