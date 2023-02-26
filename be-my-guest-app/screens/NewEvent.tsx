import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';
import { View, Input, Button, Stack, FormControl, WarningOutlineIcon, TextArea } from 'native-base';
import React from 'react';


export default function NewEventScreen() {
  const formInitialValues = {titolo: "", luogo: "", quando: "", descrizione:""};
  const errorsInitialValues = {titolo: false, luogo: false, quando: false, descrizione:false};
  const [state, setValue] = React.useState(formInitialValues);
  const [errors, setErrors] = React.useState(errorsInitialValues);

  const validate = () => {
    console.log("🚀 ~ state", state);
    console.log("🚀 ~ errors", errors);
    setErrors({
      ...errors,
      titolo: !state.titolo,
      luogo: !state.luogo,
      quando: !state.quando
    });
    console.log("🚀 ~  state",  state);
    console.log("🚀 ~ errors", errors);
  }

  const isFormValid = () => {
    return !(errors.titolo || errors.luogo || errors.quando);
  };

  const saveNewEvent = () => {
    console.log("🚀 ~ isFormValid()", isFormValid());
    validate();
    if (!isFormValid()) return;
    return isFormValid();
    console.log("🚀 ~ value", state);
  }

  //const handleChange = (text: any) => setValue(text);

  const description = "Ciao, sono Jordan, un developer in smart working con la passione per il buon cibo. Spesso pranzo da solo a casa, ma buttare su un piatto di pasta in più non mi costa niente. Passate a trovarmi per un pranzo veloce!";

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Pubblica nuovo evento</Text>
      <Stack space={1}>
      <FormControl isRequired isInvalid={errors.titolo}>
        <FormControl.Label>Titolo</FormControl.Label>
        <Input  style={styles.input} size="md" placeholder="Cena casalinga" onChangeText={(text: any) => setValue(
          {...state, titolo: text}
        )}/>
        <FormControl.ErrorMessage>
        {errors.titolo && "Titolo obbligatorio"}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.luogo}>
        <FormControl.Label>Luogo</FormControl.Label>
        <Input style={styles.input} size="md" placeholder="Verona" onChangeText={(text: any) => setValue(
           {...state, luogo: text}
        )}/>
          <FormControl.ErrorMessage>
          {errors.luogo && "Luogo obbligatorio"}
          </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.quando}>
        <FormControl.Label>Quando</FormControl.Label>
        <Input style={styles.input} size="md" placeholder={errors.luogo.toString()} onChangeText={(text: any) => setValue(
          {...state, quando: text}
        )}/>
          <FormControl.ErrorMessage>
          {errors.luogo && "Quando obbligatorio"}
          </FormControl.ErrorMessage>
      </FormControl>
      <FormControl>
        <FormControl.Label>Descrizione</FormControl.Label>
        <TextArea style={styles.textarea} size="sm" placeholder={description} onChangeText={(text: any) => setValue(
          {...state, descrizione: text}
        )}/>
      </FormControl>
      <Button onPress={() => saveNewEvent()}>Salva</Button>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 1,
  },
  textarea: {
    minHeight: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  error:{
    color: 'red',
    marginTop: 1,
  }
});
