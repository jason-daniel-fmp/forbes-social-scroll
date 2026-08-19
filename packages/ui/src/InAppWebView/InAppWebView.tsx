import { Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { useTheme } from '@forbes/theme';

import { createInAppWebViewStyles } from './InAppWebView.styles';

interface InAppWebViewProps {
  visible: boolean;
  url: string;
  title: string;
  onClose: () => void;
}

export function InAppWebView({ visible, url, title, onClose }: InAppWebViewProps) {
  const { theme } = useTheme();
  const styles = createInAppWebViewStyles(theme);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.toolbar}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityRole="button">
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
        {visible && url ? (
          <WebView source={{ uri: url }} style={styles.webview} startInLoadingState />
        ) : null}
      </SafeAreaView>
    </Modal>
  );
}
