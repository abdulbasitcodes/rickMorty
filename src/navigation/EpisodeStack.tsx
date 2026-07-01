import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CharacterDetailScreen } from '../features/characters/screens/CharacterDetailScreen';
import { EpisodeDetailScreen } from '../features/episodes/screens/EpisodeDetailScreen';
import { EpisodeListScreen } from '../features/episodes/screens/EpisodeListScreen';
import { colors } from '../theme/colors';
import type { EpisodesStackParamList } from './types';

const Stack = createNativeStackNavigator<EpisodesStackParamList>();

// Solid header for text-first screens so content is laid out below the bar.
const solidHeader = {
  headerShown: true,
  headerTitle: '',
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal' as const,
};

// Transparent header for the character detail, whose avatar fills the top.
const transparentHeader = {
  headerShown: true,
  headerTitle: '',
  headerTransparent: true,
  headerTintColor: colors.textPrimary,
  headerBackButtonDisplayMode: 'minimal' as const,
};

export function EpisodeStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="EpisodeList"
        component={EpisodeListScreen}
        options={{
          headerShown: true,
          headerTitle: 'Episodes',
          headerLargeTitle: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} options={solidHeader} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={transparentHeader} />
    </Stack.Navigator>
  );
}
