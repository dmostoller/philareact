import Avatar from 'boring-avatars';

interface BoringAvatarProps {
  name: string;
  size: number;
}

// Different color palettes for more variety
const PALETTES = [
  ['#A3A948', '#EDB92E', '#F85931', '#CE1836', '#009989'], // Original
  ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'], // Ocean
  ['#606C38', '#283618', '#DDA15E', '#BC6C25', '#FEFAE0'], // Earth
  ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429'], // Modern
  ['#FF00FF', '#00FFFF', '#FF2281', '#1A1A1A', '#41EAD4'], // Cyberpunk
  ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'], // Sunset
];

export function BoringAvatar({ name, size }: BoringAvatarProps) {
  // Use name to consistently select palette and variant
  const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const paletteIndex = hash % PALETTES.length;

  return <Avatar size={size} name={name} variant="bauhaus" colors={PALETTES[paletteIndex]} />;
}
