import type { ImageSourcePropType } from 'react-native';

import author01 from '../../../assets/AuthorBlock/author-01.png';
import author02 from '../../../assets/AuthorBlock/author-02.png';
import author03 from '../../../assets/AuthorBlock/author-03.png';
import author04 from '../../../assets/AuthorBlock/author-04.png';
import author05 from '../../../assets/AuthorBlock/author-05.png';
import author06 from '../../../assets/AuthorBlock/author-06.png';

const authorAvatars: Record<string, ImageSourcePropType> = {
  'author-01': author01,
  'author-02': author02,
  'author-03': author03,
  'author-04': author04,
  'author-05': author05,
  'author-06': author06,
};

export function getAuthorAvatar(avatarKey?: string): ImageSourcePropType | undefined {
  if (!avatarKey) {
    return undefined;
  }
  return authorAvatars[avatarKey];
}
