import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, FlatList, Alert, KeyboardAvoidingView,
  Platform, TouchableWithoutFeedback, Keyboard, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import * as Notifications from 'expo-notifications';
import styles from '../styles';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ObiectiveScreen = () => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [goalDate, setGoalDate] = useState('');
  const [goals, setGoals] = useState([]);
  const [progressInputs, setProgressInputs] = useState({});

  useEffect(() => {
    const requestPermissions = async () => {
      await Notifications.requestPermissionsAsync();
    };
    requestPermissions();
  }, []);
  

  useEffect(() => {
    const loadGoals = async () => {
      const storedGoals = await AsyncStorage.getItem('goals');
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }
    };
    loadGoals();
  }, []);

  const scheduleNotification = async (title, body) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null, // notificare instant
    });
  };

  const handleAddGoal = async () => {
    if (!goalName || !targetAmount || !goalDate) {
      Alert.alert('Error', 'Toate câmpurile trebuie completate!');
      return;
    }

    const newGoal = {
      id: Math.random().toString(),
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      goalDate: goalDate,
      progress: 0,
      completed: false,
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));

    setGoalName('');
    setTargetAmount('');
    setGoalDate('');
    Alert.alert('Succes', 'Obiectivul a fost adăugat cu succes!');
  };

  const handleGoalProgress = async (goalId, inputProgress) => {
    const parsedProgress = parseFloat(inputProgress);
    if (isNaN(parsedProgress) || parsedProgress <= 0) {
      Alert.alert('Error', 'Suma progresului trebuie să fie validă!');
      return;
    }

    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedProgress = goal.progress + parsedProgress;

        if (updatedProgress > goal.targetAmount) {
          Alert.alert('Error', 'Progresul nu poate depăși suma țintă!');
          return goal;
        }

        // Notificare 80%
        if (
          updatedProgress >= 0.8 * goal.targetAmount &&
          goal.progress < 0.8 * goal.targetAmount
        ) {
          scheduleNotification('Obiectiv aproape atins!', 'Progresul tău a ajuns la 80%.');
        }

        // Notificare obiectiv atins
        if (updatedProgress >= goal.targetAmount && !goal.completed) {
          scheduleNotification('Felicitări!', 'Ai atins obiectivul tău financiar!');
          return { ...goal, progress: updatedProgress, completed: true };
        }

        return { ...goal, progress: updatedProgress };
      }
      return goal;
    });

    setGoals(updatedGoals);
    await AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
    setProgressInputs((prev) => ({ ...prev, [goalId]: '' }));
  };

  const handleDateSelect = (date) => {
    setGoalDate(date.dateString);
  };

  const renderGoalItem = ({ item }) => (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{item.name}</Text>
      <Text style={styles.goalText}>Țintă: {item.targetAmount} Lei</Text>
      <Text style={styles.goalText}>Realizat: {item.progress.toFixed(2)} Lei</Text>
      <Text style={styles.goalText}>Dată limită: {item.goalDate}</Text>
      <Text style={[styles.goalText, { color: '#a5d6a7' }]}>
        Mai rămâne: {(item.targetAmount - item.progress).toFixed(2)} Lei
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Adaugă progres"
        keyboardType="numeric"
        value={progressInputs[item.id] || ''}
        onChangeText={(value) => setProgressInputs({ ...progressInputs, [item.id]: value })}
      />
      <Button title="Adaugă progres" onPress={() => handleGoalProgress(item.id, progressInputs[item.id])} />
    </View>
  );

  return (
    <ImageBackground source={require('../assets/images/background2.jpg')} style={styles.background}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{ paddingBottom: 200 }}
              ListHeaderComponent={
                <View>
                  <Text style={styles.title}>Obiective financiare</Text>
                  <View style={styles.box}>
                    <TextInput
                      style={styles.input}
                      placeholder="Nume obiectiv"
                      placeholderTextColor="white"
                      value={goalName}
                      onChangeText={setGoalName}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Sumă țintă"
                      placeholderTextColor="white"
                      keyboardType="numeric"
                      value={targetAmount}
                      onChangeText={setTargetAmount}
                    />
                    <Calendar
                      markedDates={{ [goalDate]: { selected: true, selectedColor: 'blue' } }}
                      onDayPress={handleDateSelect}
                      monthFormat={'yyyy MM'}
                    />
                    <Button title="Adaugă Obiectiv" onPress={handleAddGoal} />
                  </View>
                </View>
              }
              data={goals}
              keyExtractor={(item) => item.id}
              renderItem={renderGoalItem}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ObiectiveScreen;
