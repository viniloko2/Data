import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const DateTimePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentDate);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentDate);
  };

  const formatDate = (date) => {
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  const showConfirmationAlert = () => {
    const confirmationMessage = `Deseja confirmar a reserva do dia ${format(selectedDate, 'dd/MM/yyyy')}\nHorário de ${format(startTime, 'HH:mm')} até ${format(endTime, 'HH:mm')}?`;
    Alert.alert(
      'Confirmação',
      confirmationMessage,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: generateReservation },
      ],
      { cancelable: false }
    );
  };
  

  const generateReservation = () => {
    const formattedDate = format(selectedDate, 'dd/MM/yyyy');
    const formattedStartTime = format(startTime, 'HH:mm');
    const formattedEndTime = format(endTime, 'HH:mm');
  
    const data = {
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
  
    const jsonData = JSON.stringify(data, null, 2);
    console.log('Dados enviados:', jsonData);
    Alert.alert('Reserva Confirmada', 'Horário reservado com sucesso!');
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Selecionar Dia" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.row}>
        <Button title="Selecionar Início" onPress={() => setShowStartTimePicker(true)} />
        {showStartTimePicker && (
          <DateTimePicker
            testID="startTimePicker"
            value={startTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
      </View>
      
      <View style={styles.row}>
        <Button title="Selecionar Fim" onPress={() => setShowEndTimePicker(true)} />
        {showEndTimePicker && (
          <DateTimePicker
            testID="endTimePicker"
            value={endTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
      </View>

      <Text style={styles.infoText}>Data Selecionada: {format(selectedDate, 'dd/MM/yyyy')}</Text>
      <Text style={styles.infoText}>Horário de Início: {format(startTime, 'HH:mm')}</Text>
<Text style={styles.infoText}>Horário Final: {format(endTime, 'HH:mm')}</Text>


      <Button title="Enviar" onPress={showConfirmationAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginVertical: 10,
    fontSize: 16,
  },
});

export default DateTimePickerComponent;
