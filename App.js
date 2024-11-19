import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import MainNavigator from './src/navigation/MainNavigator';
//import TabNavigator from './src/navigation/TabNavigator';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import toastConfig from './src/config/toastConfig';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Nunito': require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
    'Gloock': require('./assets/fonts/Gloock-Regular.ttf')
  });


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </Provider>
  );
}

