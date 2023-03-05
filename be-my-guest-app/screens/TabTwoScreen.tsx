import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
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
    'Jost': require('../assets/fonts/Jost/Jost-VariableFont_wght.ttf'),
  });

  // const setupAmplifyAndCognito = async() => {
  //   Amplify.configure({
  //     Auth: {
  //       region: "eu-west-3",
  //       userPoolId: "eu-west-3_sgdTbPSUw",
  //       userPoolWebClientId: "1uheo51s9vlr2mna8tj4hvbhlm",
  //       oauth: {
  //         domain: "https://be-my-guest.auth.eu-west-3.amazoncognito.com",
  //         scope: ["email", "openid", "aws.cognito.signin.user.admin", "profile"],
  //         redirectSignIn: "https://webhook.site/2aab686f-0ae0-4e0f-bf9e-58c72eba54d9",
  //         redirectSignOut: "https://webhook.site/2aab686f-0ae0-4e0f-bf9e-58c72eba54d9",
  //         responseType: "code"
  //       }
  //     },

  //     API: {
  //       endpoints: [
  //         {
  //           name: "MyBlogPostAPI",
  //           endpoint: "<enter here the API gateway endpoint url>"
  //         }
  //       ]
  //     }
  //   });
  // };

  //setupAmplifyAndCognito();
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Jost', fontSize: 30 }}>Inter Black</Text>
      {/* <Button onPress={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})} > */}
  {/* Federated Sign In */}
{/* </Button> */}
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
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
