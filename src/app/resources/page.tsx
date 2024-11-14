import ResourceCard from '../../components/ResourceCard';
import { Library } from 'lucide-react';

const resources = [
  {
    title: 'React Documentation',
    description: 'The official React documentation for learning and reference.',
    link: 'https://reactjs.org/docs/getting-started.html',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/React-icon.svg', // Placeholder for the React logo
  },
  {
    title: 'Next.js Documentation',
    description: 'The official Next.js documentation for building full-stack React applications.',
    link: 'https://nextjs.org/docs',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/nextjs-icon-svgrepo-com.svg',
  },
  {
    title: 'JavaScript Info',
    description: 'A comprehensive guide to modern JavaScript, from basics to advanced topics.',
    link: 'https://javascript.info/',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/JavaScript-logo.png', // Placeholder for the JS logo
  },
  {
    title: 'Tailwind CSS Documentation',
    description: 'Learn how to style your apps quickly with the utility-first Tailwind CSS framework.',
    link: 'https://tailwindcss.com/docs',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/Tailwind_CSS_Logo.svg', // Placeholder for the Tailwind logo
  },
  {
    title: 'Frontend Masters',
    description: 'Advanced JavaScript and front-end development training from industry experts.',
    link: 'https://frontendmasters.com/',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/idexi87EhO.webp', // Placeholder for the Frontend Masters logo
  },
  {
    title: 'MDN Web Docs',
    description: 'The best resource for documentation on HTML, CSS, and JavaScript from Mozilla.',
    link: 'https://developer.mozilla.org/',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/mdn-logo-6DB9B0093F-seeklogo.com.webp', // Placeholder for the MDN logo
  },
  {
    title: 'CSS-Tricks',
    description: 'A comprehensive resource for CSS, JavaScript, and front-end development tips.',
    link: 'https://css-tricks.com/',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/CSS-Tricks-star.png',
  },
  {
    title: 'Wes Bos Tutorials',
    description: 'High-quality tutorials on modern JavaScript, React, and more by Wes Bos.',
    link: 'https://wesbos.com/',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/wesbos-logo.webp', // Placeholder for the Wes Bos logo
  },
  {
    title: 'Egghead.io',
    description: 'Bite-sized video tutorials for learning React, JavaScript, and front-end development.',
    link: 'https://egghead.io/',
    logoSrc: 'https://philareact.s3.us-east-2.amazonaws.com/egglogo.webp', // Placeholder for the Egghead logo
  },
];

export default function ResourcesPage() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        <div className="flex justify-center items-center">
          <Library size={28} className="mr-2" />
          Front-End Resources
        </div>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.title}
            title={resource.title}
            description={resource.description}
            link={resource.link}
            logoSrc={resource.logoSrc}
          />
        ))}
      </div>
    </section>
  );
}
