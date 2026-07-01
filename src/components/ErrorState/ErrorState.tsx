import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

/** Props for {@link ErrorState}. */
export interface ErrorStateProps {
  /** Heading text. Defaults to a generic error title. */
  title?: string;
  /** Supporting message under the title. */
  message?: string;
  /** Callback invoked when the user taps "Try again". */
  onRetry: () => void;
}

/**
 * Reusable full-screen error placeholder with a retry action.
 * Memoized; re-renders only when its props change.
 */
function ErrorStateComponent({
  title = 'Something went wrong',
  message = 'We could not load the data. Please check your connection and try again.',
  onRetry,
}: ErrorStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel="Try again"
      >
        <Text style={styles.buttonLabel}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  icon: { fontSize: 40, marginBottom: 12 },
  title: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  message: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonPressed: { opacity: 0.8 },
  buttonLabel: {
    color: colors.background,
    fontSize: 15,
    fontWeight: '700',
  },
});

export const ErrorState = memo(ErrorStateComponent);
