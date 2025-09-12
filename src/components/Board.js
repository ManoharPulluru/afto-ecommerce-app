import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';

export default function Board() {
  const webViewRef = useRef(null);
  const theme = 'dark'; // Fixed theme value

  // JavaScript code to inject into WebView to send theme
  const injectedJavaScript = `
    window.postMessage(
      JSON.stringify({ type: "SET_THEME", theme: "${theme}" }),
      "https://hycoder-classroom-frontend.onrender.com"
    );
    true; // Required by WebView
  `;

  // Handle WebView load to resend theme
  const handleLoad = () => {
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(injectedJavaScript);
    }
  };

  // Resend theme when it changes (though theme is static here)
  useEffect(() => {
    handleLoad();
  }, [theme]);

  return (
    <View style={[styles.container, styles.dark]}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://hycoder-qa.onrender.com/' }}
        style={styles.webview}
        onLoad={handleLoad}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        originWhitelist={['*']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121', // Default background color
  },
  light: {
    backgroundColor: '#ffffff', // Light background
  },
  dark: {
    backgroundColor: '#1a1a1a', // Dark background
  },
  webview: {
    flex: 1,
    marginTop: 30,
    borderWidth: 0,
  },
});
