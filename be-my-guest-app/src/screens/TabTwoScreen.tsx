import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
//import EditScreenInfo from '../shared-components/EditScreenInfo';
import { Text, View} from '../shared-components/Themed';
import { Button} from "native-base";

// @ts-ignore
// import { withAuthenticator } from 'aws-amplify-react-native'
// @ts-ignore
// import Amplify, {Hub} from "aws-amplify";
import { useFonts } from 'expo-font';
// @ts-ignore
//import {Auth , CognitoHostedUIIdentityProvider} from "aws-amplify";

export default function TabTwoScreen() {

  const [fontsLoaded] = useFonts({
    'Jost': require('../../assets/fonts/Jost/Jost-VariableFont_wght.ttf'),
  });

  //setupAmplifyAndCognito();
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Jost', fontSize: 30 }}>Inter Black</Text>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/*<EditScreenInfo path="/screens/TabTwoScreen.tsx" />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
