import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import { ExpensesProvider } from './context/ExpensesContext';
import { IncomeProvider } from './context/IncomeContext';
import { GoalsProvider } from './context/GoalsContext';

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Permisiunea pentru notificări a fost refuzată!');
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
    } else {
      alert('Notificările funcționează doar pe un dispozitiv fizic.');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  return (
    <GoalsProvider>
      <IncomeProvider>
        <ExpensesProvider>
          <AppNavigator />
        </ExpensesProvider>
      </IncomeProvider>
    </GoalsProvider>
  );
};

export default App;
