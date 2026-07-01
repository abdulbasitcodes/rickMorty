import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CharacterDetailScreen } from "../features/characters/screens/CharacterDetailScreen";
import { CharacterListScreen } from "../features/characters/screens/CharacterListScreen";
import { EpisodeDetailScreen } from "../features/episodes/screens/EpisodeDetailScreen";
import { colors } from "../theme/colors";
import type { CharacterStackParamList } from "./types";

const Stack = createNativeStackNavigator<CharacterStackParamList>();

// Solid header for text-first screens so content is laid out below the bar.
const solidHeader = {
  headerShown: true,
  headerTitle: "",
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.textPrimary,
  headerShadowVisible: false,
  headerBackButtonDisplayMode: "minimal" as const,
};

/**
 * Native stack for the character feature. The list renders its own animated
 * header, so the native one is hidden there. `EpisodeDetail` is registered
 * here too, so a character's episode strip can push straight into it.
 */
export function CharacterStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="CharacterList" component={CharacterListScreen} />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: colors.textPrimary,
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="EpisodeDetail"
        component={EpisodeDetailScreen}
        options={solidHeader}
      />
    </Stack.Navigator>
  );
}
