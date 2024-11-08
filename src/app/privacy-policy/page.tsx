import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-4 px-2">
      <div className="max-w-5xl mx-auto p-6 border-2 border-dark-slate-700 shadow-lg rounded-2xl bg-dark-slate-950">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. It is PhilaReact&apos;s policy to respect your privacy regarding
          any information we may collect from you across our website, https://www.philareact.org, and other
          sites we own and operate.
        </p>
        <h2 className="text-xl font-bold mb-4">Information We Collect</h2>
        <p className="mb-4">
          We only ask for personal information when we truly need it to provide a service to you. We collect
          it by fair and lawful means, with your knowledge and consent. We also let you know why we’re
          collecting it and how it will be used.
        </p>
        <h2 className="text-xl font-bold mb-4">How We Use Information</h2>
        <p className="mb-4">
          We use the information we collect in various ways, including to:
          <ul className="list-disc list-inside">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you, either directly or through one of our partners, including for customer
              service, to provide you with updates and other information relating to the website, and for
              marketing and promotional purposes
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </p>
        <h2 className="text-xl font-bold mb-4">Data Retention</h2>
        <p className="mb-4">
          We will retain your personal information only for as long as is necessary for the purposes set out
          in this Privacy Policy. We will retain and use your information to the extent necessary to comply
          with our legal obligations, resolve disputes, and enforce our policies.
        </p>
        <h2 className="text-xl font-bold mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete the information we have on you. If you wish to
          exercise any of these rights, please contact us.
        </p>
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:support@philareacy.org" className="hover:underline">
            support@philareact.org
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
