import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { CharacterDetailScreen } from '../features/characters/screens/CharacterDetailScreen';
import { EpisodeDetailScreen } from '../features/episodes/screens/EpisodeDetailScreen';
import { LocationDetailScreen } from '../features/locations/screens/LocationDetailScreen';
import { LocationListScreen } from '../features/locations/screens/LocationListScreen';
import { colors } from '../theme/colors';
import type { LocationsStackParamList } from './types';

const Stack = createNativeStackNavigator<LocationsStackParamList>();

const solidHeader = {
  headerShown: true,
  headerTitle: '',
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal' as const,
};

// The resident avatar drills into the character detail, whose avatar fills the top.
const transparentHeader = {
  headerShown: true,
  headerTitle: '',
  headerTransparent: true,
  headerTintColor: colors.textPrimary,
  headerBackButtonDisplayMode: 'minimal' as const,
};

export function LocationStack(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LocationList"
        component={LocationListScreen}
        options={{
          headerShown: true,
          headerTitle: 'Locations',
          headerLargeTitle: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="LocationDetail" component={LocationDetailScreen} options={solidHeader} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={transparentHeader} />
      <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} options={solidHeader} />
    </Stack.Navigator>
  );
}
