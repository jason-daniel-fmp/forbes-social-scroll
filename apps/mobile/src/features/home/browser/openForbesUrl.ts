import * as WebBrowser from 'expo-web-browser';

export async function openForbesUrl(url: string): Promise<boolean> {
  try {
    await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      dismissButtonStyle: 'close',
      enableBarCollapsing: true,
      toolbarColor: '#FFFFFF',
      controlsColor: '#35B782',
      showTitle: true,
    });
    return true;
  } catch {
    return false;
  }
}
