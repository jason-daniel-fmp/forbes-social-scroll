import { useCallback, useState } from 'react';
import { ActivityIndicator, Linking, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { useTheme } from '@forbes/theme';
import { ActionLink, NavBar } from '@forbes/ui';

import { openForbesUrl } from '../browser/openForbesUrl';
import type { HomeBuyingPhaseTool } from '../data/homeBuyingPhases';
import { createHomeBuyingWebViewStyles } from './HomeBuyingWebViewScreen.styles';

const SAFARI_USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1';

const REVEAL_PAGE_SCRIPT = `
  (function () {
    var message = document.getElementById('cmsg');
    if (message) {
      message.style.animation = 'none';
      message.style.opacity = '1';
    }
    document.documentElement.style.height = '100%';
    if (document.body) {
      document.body.style.minHeight = '100vh';
      document.body.style.opacity = '1';
      document.body.style.visibility = 'visible';
    }
    true;
  })();
`;

interface HomeBuyingWebViewScreenProps {
  tool: HomeBuyingPhaseTool;
  onBack: () => void;
}

export function HomeBuyingWebViewScreen({ tool, onBack }: HomeBuyingWebViewScreenProps) {
  const { theme } = useTheme();
  const styles = createHomeBuyingWebViewStyles(theme);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleOpenInSafari = useCallback(() => {
    void openForbesUrl(tool.url).then((openedInApp) => {
      if (!openedInApp) {
        void Linking.openURL(tool.url);
      }
    });
  }, [tool.url]);

  return (
    <View style={styles.container}>
      <NavBar
        onBack={onBack}
        backLabel="Back"
        rightSlot={
          <ActionLink
            label="Safari"
            onPress={handleOpenInSafari}
            size="compact"
            trailingArrow={false}
            accessibilityLabel="Open in Safari"
          />
        }
      />

      <View style={styles.webview}>
        <WebView
          source={{
            uri: tool.url,
            headers: {
              Referer: 'https://www.forbes.com/',
            },
          }}
          style={styles.webviewSurface}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          originWhitelist={['*']}
          userAgent={SAFARI_USER_AGENT}
          applicationNameForUserAgent="Safari/604.1"
          injectedJavaScript={REVEAL_PAGE_SCRIPT}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
        />

        {isLoading ? (
          <View style={styles.loadingOverlay} pointerEvents="none">
            <ActivityIndicator size="large" color={theme.colors.accent} />
            <Text style={styles.loadingText}>Loading…</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
