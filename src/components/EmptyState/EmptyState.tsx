import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

/** Props for {@link EmptyState}. */
export interface EmptyStateProps {
  /** Primary heading, e.g. "No characters found". */
  title: string;
  /** Optional supporting message under the title. */
  message?: string;
  /** Optional emoji/glyph shown above the title. Defaults to a magnifier. */
  icon?: string;
}

/**
 * Presentational, reusable placeholder shown when a list has no results.
 * Memoized as it is purely driven by its (stable) props.
 */
function EmptyStateComponent({
  title,
  message,
  icon = '🔍',
}: EmptyStateProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
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
  icon: {
    fontSize: 40,
    marginBottom: 12,
  },
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
  },
});

export const EmptyState = memo(EmptyStateComponent);
