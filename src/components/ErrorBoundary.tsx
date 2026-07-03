import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { reportError } from '../utils/crashReporting';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * App-wide error boundary. Catches render/lifecycle crashes in any screen so a
 * single bad component can never white-screen the whole kiosk in front of a
 * client. Shows a branded recovery screen with a "Try again" action.
 *
 * Crashes are also forwarded to Sentry via reportError() (src/utils/crashReporting.ts)
 * when EXPO_PUBLIC_SENTRY_DSN is configured; otherwise that call is a no-op.
 */
export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error in component tree:', error, info.componentStack);
    reportError(error, { componentStack: info.componentStack });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>
            The screen ran into an unexpected problem. You can return to it and continue.
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleReset} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B1E33',
    padding: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: 28,
    maxWidth: 520,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FFCF77',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 26,
  },
  buttonText: {
    color: '#483E2D',
    fontSize: 16,
    fontWeight: '700',
  },
});
