import {
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { Avatar, Container, Heading, Box, Text, Stack, HStack, Center, Button, Spacer} from "native-base";

import { View } from '../shared-components/Themed';
import { RootTabScreenProps } from '../../types';
import { formatWithOptions } from 'date-fns/fp';
import { it } from 'date-fns/locale';
import { Item, ItemRender } from '../models/models';
import EventDataService from "../services/app.services";
import { useEffect, useState } from "react";

import { Amplify, Auth, Hub } from "aws-amplify";
import * as Linking from 'expo-linking';
import store from './../redux/store'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../redux/slices/event.slice';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const dispatch = useDispatch();

  //get events from store
  const eventsSelector = (state:any) => {
    console.log("🚀 ~ eventsSelector state:", state);
    return state?.events?.data;
  };
  const events = useSelector(eventsSelector);

  //listen for the end of login flow and then usubscribe
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signOut":
          //console.log("🚀 ~ signOut entrypoint:");
          store.dispatch({ type: 'auth/logout', payload: {} });
          break;
      }
    });
    return unsubscribe;
  }, []);


  //trigger the getAllEvents action
  useEffect(() => { 
    dispatch(getAllEvents());
  }, []);


  const mockData: Item[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Pranzo di lavoro 30 min',
      when: new Date('1995-07-25T20:00:00'),
      where: 'Veronella camporella',
      userId: 'userId1'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Frittata in compagnia',
      when: new Date('1995-07-25T20:00:00'),
      where: 'Veronella camporella',
      userId: 'userId1'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Popi gratis per tutti',
      when: new Date('1995-07-25T20:00:00'),
      where: 'Veronella camporella',
      userId: 'userId1'
    },
  ];
  
  const mapItemForRender = (itemData: Item) => {
    console.log("🚀 ~ mapItemForRender - itemData:", itemData);
    return {
      itemProps: itemData,
      distance: '',
      userAvatarUrl: './../../assets/images/icon.png',
      //formattedWhen: formatWithOptions({ locale: it }, "eeee d MMMM '-' H:MM", itemData.when) /*formatWithOptions({ locale: it }, "dddd mmmm - hh:MM")*/,
    } as ItemRender;
  }

  const callApi = (add1: number, add2: number) => {
    EventDataService.getSum(add1, add2).then((res:any) => {
      console.log("🚀 ~ res", res);
    }).catch((err:any) => {
      console.log("🚀 ~ err", err);
    });
    //EventDataService.loggaNelLoggerDeiPoveri(Linking.makeUrl());
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
                require('./../../assets/images/icon.png')
              }
            />
          </Center>
          <Stack p="5">
            <Heading size="md" color="black">{itemProps.title}</Heading>
            <Text fontSize="xs" color="primary.500">{itemRenderProps.formattedDateTime}</Text>
            <Text color="black">{itemProps.where}{ itemRenderProps.distance ? " - " + itemRenderProps.distance :""} </Text>
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
      <Button onPress={() => Auth.signOut()}>Sign out</Button>
      <FlatList
        data={events}
        renderItem={({item}: {item: Item}) => <Item
          id={item.id}
          key={item.id}
          title={item.title}
          where={item.where?.city}
          when={item.when}
          userId={item.userId}
  />}
        keyExtractor={item => item.id}
      />
      <Button onPress={() => callApi(5, 2)}>Click Me</Button>
      <Button onPress={() => dispatch(getAllEvents())}>Aggiorna eventi</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    padding: 4
  }
});

