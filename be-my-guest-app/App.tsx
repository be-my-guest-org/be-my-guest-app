import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import * as React from 'react';
import Navigation from './src/navigation';
import * as Linking from 'expo-linking';

import { NativeBaseProvider, extendTheme  } from "native-base";
import { Provider } from 'react-redux';

import store from './src/redux/store'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const url = Linking.useURL();

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);

    console.log(
      `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    );
  }

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: '#f1ebf7',
      100: '#ddceeb',
      200: '#c6aede',
      300: '#af8dd0',
      400: '#9e74c6',
      500: '#8d5cbc',
      600: '#8554b6',
      700: '#7a4aad',
      800: '#7041a5',
      900: '#5d3097',
    },
    // Redefining only one shade, rest of the color will remain same.
    matchingBlue: {
      400: '#4571CE',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Provider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
