import { Image, Text, View, type ImageSourcePropType } from 'react-native';

import { useTheme } from '@forbes/theme';

import { createAuthorBlockStyles } from './AuthorBlock.styles';

interface AuthorBlockProps {
  name: string;
  role: string;
  avatarSource?: ImageSourcePropType;
}

export function AuthorBlock({ name, role, avatarSource }: AuthorBlockProps) {
  const { theme } = useTheme();
  const styles = createAuthorBlockStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.avatarRing}>
        {avatarSource ? (
          <Image
            source={avatarSource}
            style={styles.avatar}
            resizeMode="cover"
            accessibilityLabel={`${name} profile photo`}
          />
        ) : (
          <View style={styles.avatar} />
        )}
      </View>
      <Text style={styles.editorTag}>Editor</Text>
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.role} numberOfLines={2}>
        {role}
      </Text>
    </View>
  );
}
