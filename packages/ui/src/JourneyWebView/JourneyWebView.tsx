import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { useTheme } from '@forbes/theme';
import type { JourneyId } from '@forbes/types';

import { createJourneyWebViewStyles } from './JourneyWebView.styles';

export interface JourneyWebViewProps {
  visible: boolean;
  journeyId: JourneyId;
  stepId: string;
  url: string;
  title: string;
  onClose: () => void;
}

function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function JourneyWebView({
  visible,
  journeyId,
  stepId,
  url,
  title,
  onClose,
}: JourneyWebViewProps) {
  const { theme } = useTheme();
  const styles = createJourneyWebViewStyles(theme);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const urlIsValid = useMemo(() => isValidUrl(url), [url]);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleHttpError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setReloadKey((current) => current + 1);
  }, []);

  const handleClose = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    onClose();
  }, [onClose]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.toolbar}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back to previous step"
          >
            <Text style={styles.closeText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {!urlIsValid ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateTitle}>Experience unavailable</Text>
            <Text style={styles.stateMessage}>
              This step is not available yet. Please try again later.
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleClose}
              accessibilityRole="button"
            >
              <Text style={styles.retryText}>Go back</Text>
            </TouchableOpacity>
          </View>
        ) : hasError ? (
          <View style={styles.stateContainer}>
            <Text style={styles.stateTitle}>Unable to load</Text>
            <Text style={styles.stateMessage}>
              We could not load this experience. Check your connection and try again.
            </Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRetry}
              accessibilityRole="button"
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.webviewContainer}>
            {visible ? (
              <WebView
                key={`${journeyId}-${stepId}-${reloadKey}`}
                source={{ uri: url }}
                style={styles.webview}
                startInLoadingState
                onLoadStart={handleLoadStart}
                onLoadEnd={handleLoadEnd}
                onError={handleError}
                onHttpError={handleHttpError}
              />
            ) : null}
            {isLoading ? (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={theme.colors.accent} />
                <Text style={styles.loadingText}>Loading…</Text>
              </View>
            ) : null}
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}
