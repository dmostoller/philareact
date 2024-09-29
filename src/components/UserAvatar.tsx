// UserAvatar.tsx
import { BoringAvatar } from './BoringAvatar';

interface UserAvatarProps {
  name: string;
  size?: number;
}

export default function UserAvatar({ name, size = 40 }: UserAvatarProps) {
  return <BoringAvatar name={name} size={size} />;
}
