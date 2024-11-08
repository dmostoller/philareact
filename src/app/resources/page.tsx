import ResourceCard from '../../components/ResourceCard';

const resources = [
  {
    title: 'React Documentation',
    description: 'The official React documentation for learning and reference.',
    link: 'https://reactjs.org/docs/getting-started.html',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', // Placeholder for the React logo
  },
  {
    title: 'Next.js Documentation',
    description: 'The official Next.js documentation for building full-stack React applications.',
    link: 'https://nextjs.org/docs',
    logoSrc: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', // Placeholder for the Next.js logo
  },
  {
    title: 'JavaScript Info',
    description: 'A comprehensive guide to modern JavaScript, from basics to advanced topics.',
    link: 'https://javascript.info/',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', // Placeholder for the JS logo
  },
  {
    title: 'Tailwind CSS Documentation',
    description: 'Learn how to style your apps quickly with the utility-first Tailwind CSS framework.',
    link: 'https://tailwindcss.com/docs',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', // Placeholder for the Tailwind logo
  },
  {
    title: 'Frontend Masters',
    description: 'Advanced JavaScript and front-end development training from industry experts.',
    link: 'https://frontendmasters.com/',
    logoSrc:
      'https://imgs.search.brave.com/S05vYKgqxiTYj8fjXx994CzZQJrwxJttMy-B6ys_zNM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dC5icmFuZGZldGNo/LmlvL2lkUFlTUWs2/LVovaWRleGk4N0Vo/Ty5qcGVnP3VwZGF0/ZWQ9MTcwOTQxNjI2/MjM5MQ', // Placeholder for the Frontend Masters logo
  },
  {
    title: 'MDN Web Docs',
    description: 'The best resource for documentation on HTML, CSS, and JavaScript from Mozilla.',
    link: 'https://developer.mozilla.org/',
    logoSrc:
      'https://imgs.search.brave.com/_fG2eHXeKsLxlJievxDa6CtV6EFEUT4d76xsaNIHLzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL00vbWRuLWxv/Z28tNkRCOUIwMDkz/Ri1zZWVrbG9nby5j/b20ucG5n', // Placeholder for the MDN logo
  },
  {
    title: 'CSS-Tricks',
    description: 'A comprehensive resource for CSS, JavaScript, and front-end development tips.',
    link: 'https://css-tricks.com/',
    logoSrc:
      'https://imgs.search.brave.com/Z1REHCWiXhi64tm19feMgJc_E0_RAzvsxwgo_ciUdwQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9jc3MtdHJp/Y2tzLWljb24tNDc3/eDUxMi1wZmx0cGxt/Zi5wbmc', // Placeholder for the CSS-Tricks logo
  },
  {
    title: 'Wes Bos Tutorials',
    description: 'High-quality tutorials on modern JavaScript, React, and more by Wes Bos.',
    link: 'https://wesbos.com/',
    logoSrc:
      'https://imgs.search.brave.com/_Lu2CnhwnGW_UFtNfrHSgapAkMkEvPgBVCX4Cv0z9FI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb3Vy/c2VzLndlc2Jvcy5j/b20vaW1hZ2VzL3dl/c2Jvcy1sb2dvLnBu/Zw', // Placeholder for the Wes Bos logo
  },
  {
    title: 'Egghead.io',
    description: 'Bite-sized video tutorials for learning React, JavaScript, and front-end development.',
    link: 'https://egghead.io/',
    logoSrc: 'https://i0.wp.com/hiroko.io/wp-content/uploads/2020/08/egglogo.jpg?resize=300%2C300&ssl=1/', // Placeholder for the Egghead logo
  },
];

export default function ResourcesPage() {
  return (
    <section className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-10">React & Front-End Resources</h1>
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
