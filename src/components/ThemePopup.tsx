// components/ThemePopup.tsx
interface ThemePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: string) => void;
  currentTheme: string;
}

const ThemePopup = ({ isOpen, onClose, onSelectTheme, currentTheme }: ThemePopupProps) => {
  const themes = [
    { name: 'black', color: '#000000' },
    { name: 'light', color: '#e7e7e7' },
    { name: 'forest', color: '#067513' },
    { name: 'cobalt', color: '#0842c5' },
    { name: 'cognac', color: '#a92e0f' },
    { name: 'purple', color: '#8000cb' },
    { name: 'teal', color: '#0a6565' },
    { name: 'grey', color: '#454545' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 opacity-50" onClick={onClose}></div>
      <div className="absolute top-full left-0 mt-2 bg-dark-slate-800 rounded-lg p-4 shadow-xl w-80 z-50">
        <h3 className="mb-4 text-lg font-semibold">Select Theme</h3>
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                onSelectTheme(theme.name);
                onClose();
              }}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all
                ${currentTheme === theme.name ? 'bg-dark-slate-700' : 'hover:bg-dark-slate-700'}`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 
                  ${currentTheme === theme.name ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: theme.color }}
              ></div>
              <span className="capitalize">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ThemePopup;
