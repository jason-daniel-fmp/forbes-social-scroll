import type { ImageSourcePropType } from 'react-native';

const authorAvatars: Record<string, ImageSourcePropType> = {
  'author-01': require('../../assets/AuthorBlock/author-01.png'),
  'author-02': require('../../assets/AuthorBlock/author-02.png'),
  'author-03': require('../../assets/AuthorBlock/author-03.png'),
  'author-04': require('../../assets/AuthorBlock/author-04.png'),
  'author-05': require('../../assets/AuthorBlock/author-05.png'),
  'author-06': require('../../assets/AuthorBlock/author-06.png'),
};

export function getAuthorAvatar(avatarKey?: string): ImageSourcePropType | undefined {
  if (!avatarKey) {
    return undefined;
  }
  return authorAvatars[avatarKey];
}
