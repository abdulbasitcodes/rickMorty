import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CharacterDetailScreen } from '../features/characters/screens/CharacterDetailScreen';
import { CharacterListScreen } from '../features/characters/screens/CharacterListScreen';
import { colors } from '../theme/colors';
import type { CharacterStackParamList } from './types';

const Stack = createNativeStackNavigator<CharacterStackParamList>();

/**
 * Native stack navigator for the character feature.
 *
 * The list screen hides the native header because it renders its own custom
 * `Animated` header (hide-on-scroll). The detail screen shows a themed native
 * header so users get a standard back button.
 */
export function CharacterStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CharacterList" component={CharacterListScreen} />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: colors.textPrimary,
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack.Navigator>
  );
}
