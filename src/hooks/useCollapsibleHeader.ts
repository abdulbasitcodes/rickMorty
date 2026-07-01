import { useMemo, useRef } from 'react';
import { Animated, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

/** Value returned by {@link useCollapsibleHeader}. */
export interface CollapsibleHeader {
  /** Animated translateY to apply to the (absolutely-positioned) header. */
  headerTranslateY: Animated.AnimatedInterpolation<number>;
  /** Scroll handler to pass to the scrollable's `onScroll` prop. */
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

/**
 * Drives a "hide on scroll down, reveal on scroll up" header using only the
 * React Native `Animated` API (no third-party libraries).
 *
 * It clamps the accumulated scroll delta to the header height via
 * `Animated.diffClamp`, then interpolates that to a translateY. The header is
 * expected to be absolutely positioned; translating it by `-headerHeight`
 * moves it fully off-screen. Uses the native driver for jank-free motion.
 *
 * @param headerHeight - Height of the header in pixels (the collapse distance).
 * @returns The animated translateY and an `onScroll` handler for the list.
 */
export function useCollapsibleHeader(headerHeight: number): CollapsibleHeader {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = useMemo(() => {
    const clamped = Animated.diffClamp(scrollY, 0, headerHeight);
    return clamped.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [0, -headerHeight],
      extrapolate: 'clamp',
    });
  }, [scrollY, headerHeight]);

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      }),
    [scrollY],
  );

  return { headerTranslateY, onScroll };
}
