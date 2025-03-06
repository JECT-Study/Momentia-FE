import Image from 'next/image';

interface UserThumbnailProps {
  profileImage: string | null;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
  className?: string;
}

const UserThumbnail = ({
  profileImage = '',
  size = 'md',
  priority = false,
  className = '',
}: UserThumbnailProps) => {
  const imageSize = {
    sm: { width: 50, height: 50 },
    md: { width: 67, height: 67 },
    lg: { width: 141, height: 141 },
  };

  return (
    <Image
      src={profileImage ?? '/images/defaultProfileImage.png'}
      alt={profileImage ? 'profile image' : 'artist default profile image'}
      className={`${className} rounded-full aspect-square`}
      priority={priority}
      {...imageSize[size]}
    />
  );
};

export default UserThumbnail;
