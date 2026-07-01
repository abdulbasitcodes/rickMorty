import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CharacterStack } from './CharacterStack';

/**
 * Application root navigator. Wraps the feature stacks in a single
 * `NavigationContainer`. New feature stacks can be composed here later.
 */
export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <CharacterStack />
    </NavigationContainer>
  );
}
