import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { queryClient } from './src/api/queryClient';
import { RootNavigator } from './src/navigation';
import { store } from './src/store';

/**
 * Application root. Composes the global providers in the correct order:
 * SafeArea → Redux (UI state) → React Query (server state) → Navigation.
 */
export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <RootNavigator />
        </QueryClientProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
