import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';
import { View, Input, Button, Stack, FormControl, WarningOutlineIcon, TextArea } from 'native-base';
import React from 'react';
import DatePicker from 'react-native-date-picker'


export default function NewEventScreen() {
  const formInitialValues = {titolo: "", luogo: "", quando: new Date(), descrizione:""};
  const formErrorsInitialValues = {titolo: false, luogo: false, quando: false, descrizione:false};
  const uiStateInitialValues = {isDatePickerOpened: false};
  const [formValues, setFormValues] = React.useState(formInitialValues);
  const [formErrors, setFormErrors] = React.useState(formErrorsInitialValues);
  const [uiState, setUiState] = React.useState(uiStateInitialValues);

  const validate = () => {
    console.log("🚀 ~ state", formValues);
    console.log("🚀 ~ errors", formErrors);
    setFormErrors({
      ...formErrors,
      titolo: !formValues.titolo,
      luogo: !formValues.luogo,
      quando: !formValues.quando
    });
    console.log("🚀 ~  state",  formValues);
    console.log("🚀 ~ errors", formErrors);
  }

  const isFormValid = () => {
    return !(formErrors.titolo || formErrors.luogo || formErrors.quando);
  };

  const saveNewEvent = () => {
    console.log("🚀 ~ isFormValid()", isFormValid());
    validate();
    if (!isFormValid()) return;
    return isFormValid();
    console.log("🚀 ~ value", formValues);
  }

  //const handleChange = (text: any) => setValue(text);

  const description = "Ciao, sono Jordan, un developer in smart working con la passione per il buon cibo. Spesso pranzo da solo a casa, ma buttare su un piatto di pasta in più non mi costa niente. Passate a trovarmi per un pranzo veloce!";

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Pubblica nuovo evento</Text>
      <Stack space={1}>
      <FormControl isRequired isInvalid={formErrors.titolo}>
        <FormControl.Label color="primary.500">Titolo</FormControl.Label>
        <Input  style={styles.input} size="md" placeholder="Cena casalinga" onChangeText={(text: any) => setFormValues(
          {...formValues, titolo: text}
        )}/>
        <FormControl.ErrorMessage>
        {formErrors.titolo && "Titolo obbligatorio"}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={formErrors.luogo}>
        <FormControl.Label>Luogo</FormControl.Label>
        <Input style={styles.input} size="md" placeholder="Verona" onChangeText={(text: any) => setFormValues(
           {...formValues, luogo: text}
        )}/>
          <FormControl.ErrorMessage>
          {formErrors.luogo && "Luogo obbligatorio"}
          </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={formErrors.quando}>
        <FormControl.Label>Quando</FormControl.Label>
        <Input style={styles.input} size="md" placeholder={"25/07/2025"} onPressOut={() => setUiState(
          {...uiState, isDatePickerOpened: true})}
          onChangeText={(text: any) => setFormValues(
          {...formValues, quando: text}
        )}/>
        <DatePicker
          modal
          open={uiState.isDatePickerOpened}
          date={formValues.quando}
          onConfirm={(date) => {
            setUiState({...uiState, isDatePickerOpened: false});
            setFormValues(
              {...formValues, quando: date}
            )
          }}
          onCancel={() => {
            setUiState({...uiState, isDatePickerOpened: false})
          }}
        />
          <FormControl.ErrorMessage>
          {formErrors.luogo && "Quando obbligatorio"}
          </FormControl.ErrorMessage>
      </FormControl>
      <FormControl>
        <FormControl.Label>Descrizione</FormControl.Label>
        <TextArea style={styles.textarea} size="sm" placeholder={description} onChangeText={(text: any) => setFormValues(
          {...formValues, descrizione: text}
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
