import { StatusBar } from 'expo-status-bar';
import { Linking, Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';
import { View, Input, Button, Stack, FormControl, WarningOutlineIcon, TextArea } from 'native-base';
import React, { useEffect } from 'react';
import DatePicker from 'react-native-date-picker'
import AMPLIFY_CONFIG from '../constants/Amplify';

import { Amplify, Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { RootTabScreenProps } from '../types';
//import { useState } from 'react';
import store from './../store/store'

//const [user, setUser] = useState();

export default function LoginScreen() {

  const parseLoginData = (allLoginData: any) => {
    const nameSurnameMail = {
      name: allLoginData?.signInUserSession?.idToken?.payload?.given_name,
      surname: allLoginData?.signInUserSession?.idToken?.payload?.family_name,
      email: allLoginData?.signInUserSession?.idToken?.payload?.email
    };
    return {
      token: allLoginData?.signInUserSession?.accessToken?.jwtToken,
      nameSurnameMail: nameSurnameMail
    };
  };

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
        case 'cognitoHostedUI':
          console.log("🚀 ~ signIn entrypoint:");
          store.dispatch({ type: 'auth/login', payload: parseLoginData(data) });
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => {
        console.log("🚀 ~ useEffect currentUser:", currentUser);
      })
      .catch((e) => {
        console.log("🚀 ~ useEffect e:", e);
        console.log("🚀 ~ useEffect, Not signed in")
      });

    return unsubscribe;
  }, []);
  
  //const appUrls = Linking.makeUrl();
  //console.log("🚀 ~ appUrls:", appUrls);

  Amplify.configure(AMPLIFY_CONFIG);
  const currentConfig = Auth.configure();

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Login</Text>
      <Stack space={1}>
      <Button onPress={() => Auth.federatedSignIn(
        { provider: CognitoHostedUIIdentityProvider.Google }
      )}>LogIn</Button>
      </Stack>
    </View>

  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  title: {

  }
});
