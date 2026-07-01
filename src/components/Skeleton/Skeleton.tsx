import React, { memo, useEffect, useRef } from 'react';
import { Animated, type DimensionValue, StyleSheet, type ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

/** Props for {@link Skeleton}. */
export interface SkeletonProps {
  /** Width of the placeholder block. */
  width: DimensionValue;
  /** Height of the placeholder block. */
  height: DimensionValue;
  /** Corner radius. Defaults to 6. */
  borderRadius?: number;
  /** Optional extra style overrides. */
  style?: ViewStyle;
}

/**
 * A single shimmering placeholder block used to build skeleton screens.
 * Generic and reusable — compose several together to mimic real content.
 * Uses the `Animated` API to pulse opacity while data loads.
 */
function SkeletonComponent({
  width,
  height,
  borderRadius = 6,
  style,
}: SkeletonProps): React.JSX.Element {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.base, { width, height, borderRadius, opacity }, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.skeleton,
  },
});

export const Skeleton = memo(SkeletonComponent);
