// components/ThemePopup.tsx
interface ThemePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: string) => void;
  currentTheme: string;
}

const ThemePopup = ({ isOpen, onClose, onSelectTheme, currentTheme }: ThemePopupProps) => {
  const themes = [
    { name: 'default', color: '#3d3d3d' },
    { name: 'alpine', color: '#6d5416' },
    { name: 'cobalt', color: '#0f42a9' },
    { name: 'cognac', color: '#7f260f' },
    { name: 'purple', color: '#6a00a3' },
    { name: 'persian-green', color: '#0d5454' },
    // { name: 'light', color: '#e7e7e7' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-dark-slate-800 rounded-lg p-6 z-10 shadow-xl">
        <h3 className="text-white mb-4 text-lg font-semibold">Select Theme</h3>
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
              <span className="text-white capitalize">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemePopup;
