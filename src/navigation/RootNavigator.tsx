import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { CharacterStack } from './CharacterStack';
import { EpisodeStack } from './EpisodeStack';
import { LocationStack } from './LocationStack';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const renderCharactersIcon = ({ color }: { color: string }) => (
  <Text style={[styles.icon, { color }]}>👤</Text>
);

const renderEpisodesIcon = ({ color }: { color: string }) => (
  <Text style={[styles.icon, { color }]}>🎬</Text>
);

const renderLocationsIcon = ({ color }: { color: string }) => (
  <Text style={[styles.icon, { color }]}>🌍</Text>
);

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="CharactersTab"
          component={CharacterStack}
          options={{ title: 'Characters', tabBarIcon: renderCharactersIcon }}
        />
        <Tab.Screen
          name="EpisodesTab"
          component={EpisodeStack}
          options={{ title: 'Episodes', tabBarIcon: renderEpisodesIcon }}
        />
        <Tab.Screen
          name="LocationsTab"
          component={LocationStack}
          options={{ title: 'Locations', tabBarIcon: renderLocationsIcon }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
  },
  icon: {
    fontSize: 18,
  },
});
