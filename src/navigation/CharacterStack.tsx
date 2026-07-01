import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CharacterListScreen } from '../features/characters/screens/CharacterListScreen';
import type { CharacterStackParamList } from './types';

const Stack = createNativeStackNavigator<CharacterStackParamList>();

/**
 * Native stack navigator for the character feature.
 *
 * The native header is disabled because the list screen renders its own
 * custom `Animated` header (hide-on-scroll). Only `CharacterList` is
 * registered; `CharacterDetail` will be added in a later module.
 */
export function CharacterStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CharacterList" component={CharacterListScreen} />
    </Stack.Navigator>
  );
}
