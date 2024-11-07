// GITHUBBUTTON.TSX
import React from 'react';

interface GithubButtonProps {
  onClick: () => void;
}

const GithubButton: React.FC<GithubButtonProps> = ({ onClick }) => (
  <button
    aria-label="Sign in with GitHub"
    className="flex items-center gap-4 border border-dark-slate-600 bg-gradient-to-b from-dark-slate-900 to-dark-slate-950 rounded-lg p-1 pr-5 transition-all duration-300 hover:from-dark-slate-800 hover:to-dark-slate-900"
    onClick={onClick}
  >
    <div className="flex items-center justify-center bg-white w-12 h-12 rounded-md">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98" className="w-9 h-9">
        <title>Sign in with GitHub</title>
        <desc>GitHub Logo</desc>
        <path
          d="M48.9,0C21.8,0,0,22,0,49.2C0,71,14,89.4,33.4,95.9c2.4,0.5,3.3-1.1,3.3-2.4c0-1.1-0.1-5.1-0.1-9.1
          c-13.6,2.9-16.4-5.9-16.4-5.9c-2.2-5.7-5.4-7.2-5.4-7.2c-4.4-3,0.3-3,0.3-3c4.9,0.3,7.5,5.1,7.5,5.1c4.4,7.5,11.4,5.4,14.2,4.1
          c0.4-3.2,1.7-5.4,3.1-6.6c-10.8-1.1-22.2-5.4-22.2-24.3c0-5.4,1.9-9.8,5-13.2c-0.5-1.2-2.2-6.3,0.5-13c0,0,4.1-1.3,13.4,5.1
          c3.9-1.1,8.1-1.6,12.2-1.6s8.3,0.6,12.2,1.6c9.3-6.4,13.4-5.1,13.4-5.1c2.7,6.8,1,11.8,0.5,13c3.2,3.4,5,7.8,5,13.2
          c0,18.9-11.4,23.1-22.3,24.3c1.8,1.5,3.3,4.5,3.3,9.1c0,6.6-0.1,11.9-0.1,13.5c0,1.3,0.9,2.9,3.3,2.4C83.6,89.4,97.6,71,97.6,49.2
          C97.7,22,75.8,0,48.9,0z"
        ></path>
      </svg>
    </div>
    <span className="text-base font-semibold text-white tracking-wider">GitHub</span>
  </button>
);

export default GithubButton;