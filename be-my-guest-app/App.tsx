import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit'
import tutorialReducer from './slices/event.slice';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

const reducer = {
  tutorials: tutorialReducer,
  //auth: authReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider>
          
          <Provider store={store}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Provider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
