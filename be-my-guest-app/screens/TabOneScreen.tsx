import {
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { Avatar, Container, Heading, Box, Text, Stack, HStack, Center, Button, Spacer} from "native-base";

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { formatWithOptions } from 'date-fns/fp';
import { it } from 'date-fns/locale';
import { Item, ItemRender } from '../models/models';
import EventDataService from "../services/app.services";
import { useEffect, useState } from "react";

import AMPLIFY_CONFIG from '../constants/Amplify';
import { Amplify, Auth, Hub } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          console.log("🚀 ~ signIn:");
          //setUser(data);
          break;
        case "signOut":
          console.log("🚀 ~ signIn:");
          //setUser(null);
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => {
        console.log("🚀 ~ currentUser:", currentUser);
        //setUser(currentUser)
      })
      .catch((e) => {
        console.log("🚀 ~ e:", e);
        console.log("Not signed in")
      });

    return unsubscribe;
  }, []);

  Amplify.configure(AMPLIFY_CONFIG);
  console.log("🚀 ~ AMPLIFY_CONFIG:", AMPLIFY_CONFIG);
  const currentConfig = Auth.configure();

  const mockData: Item[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Pranzo di lavoro 30 min',
      dateTime: new Date('1995-07-25T20:00:00'),
      location: 'Veronella camporella',
      userId: 'userId1'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Frittata in compagnia',
      dateTime: new Date('1995-07-25T20:00:00'),
      location: 'Veronella camporella',
      userId: 'userId1'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Popi gratis per tutti',
      dateTime: new Date('1995-07-25T20:00:00'),
      location: 'Veronella camporella',
      userId: 'userId1'
    },
  ];
  
  const mapItemForRender = (itemData: Item) => {
    return {
      itemProps: itemData,
      distance: '',
      userAvatarUrl: './../assets/images/icon.png',
      formattedDateTime: formatWithOptions({ locale: it }, "eeee d MMMM '-' H:MM", itemData.dateTime) /*formatWithOptions({ locale: it }, "dddd mmmm - hh:MM")*/,
    } as ItemRender;
  }

  const callApi = (add1: number, add2: number) => {
    EventDataService.getSum(add1, add2).then((res:any) => {
      console.log("🚀 ~ res", res);
    }).catch((err:any) => {
      console.log("🚀 ~ err", err);
    });
  };

  const Item = (itemProps: Item) => {
    const itemRenderProps = mapItemForRender(itemProps);
    
    return (
      <Box
      rounded="lg" borderColor="coolGray.100" borderWidth="1" borderRightWidth="2" borderBottomWidth="3" m="1"
      >
        <HStack>
          <Center ml="5">
            <Avatar 
              source={
                require('./../assets/images/icon.png')
              }
            />
          </Center>
          <Stack p="5">
            <Heading size="md" color="black">{itemProps.title}</Heading>
            <Text fontSize="xs" color="primary.500">{itemRenderProps.formattedDateTime}</Text>
            <Text color="black">{itemProps.location}{ itemRenderProps.distance ? " - " + itemRenderProps.distance :""} </Text>
          </Stack>
        </HStack>
      </Box >
    );
  };

  
  return (
    <View style={styles.page}>
      <HStack>
      <Text>Tab One</Text>
      <Spacer></Spacer>
      <Button onPress={() => navigation.navigate('NewEvent')}>Pubblica evento</Button>
      </HStack>
      <Button onPress={() => Auth.federatedSignIn(
        { provider: CognitoHostedUIIdentityProvider.Google }
  )}>LogIn</Button>
      <FlatList
        data={mockData}
        renderItem={({item}: {item: Item}) => <Item
          id={item.id}
          title={item.title}
          location={item.location}
          dateTime={item.dateTime}
          userId={item.userId}
        />}
        keyExtractor={item => item.id}
      />
      <Button onPress={() => callApi(5, 2)}>Click Me</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    padding: 4
  }
});
