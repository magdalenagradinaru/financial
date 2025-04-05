import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen.js';
import ExpensesScreen from '../screens/ExpensesScreen.js';
import GraphScreen from '../screens/GraphScreen.js';
import IncomeScreen from '../screens/IncomeScreen.js';
import MapScreen from '../screens/MapScreen'; 
import ObiectiveScreen from '../screens/ObiectiveScreen'; 

import styles from '../styles'; 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Stack pentru Home
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Acasă" component={HomeScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="Obiective" component={ObiectiveScreen} />
    </Stack.Navigator>
  );
};

//Stack pentru cheltuieli 
const ExpensesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cheltuieli" component={ExpensesScreen} />
    </Stack.Navigator>
  );
};



// Stack pentru ecranul de statistici
const GraphStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Statistici" component={GraphScreen} />
    </Stack.Navigator>
  );
};

// Stack pentru ecranul de venituri
const IncomesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Venituri" component={IncomeScreen} />
    </Stack.Navigator>
  );
};


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
// Definirea tab-urilor aplicației 

    
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,  // Aplică stilul pentru tabBar
          tabBarIcon: ({ color, size }) => {
            let iconName;
            // Setează iconița pentru fiecare tab în funcție de numele rutei
            if (route.name === 'Acasă') iconName = 'home';
            else if (route.name === 'Cheltuieli') iconName = 'list';
            else if (route.name === 'Venituri') iconName = 'cash';
            else if (route.name === 'Statistici') iconName = 'bar-chart';
            else if (route.name === 'Hartă') iconName = 'map';

            return <Ionicons name={iconName} size={size} color={color} style={styles.tabBarIcon} />;
          },
          tabBarActiveTintColor: styles.tabBarActiveTintColor,
          tabBarInactiveTintColor: styles.tabBarInactiveTintColor,
          tabBarStyle: [styles.tabBar, styles.tabBarShadow],  // Adaugă umbra
        })}
      >
        {/* Definirea tab-urilor aplicației */}
        <Tab.Screen name="Acasă" component={HomeStack} />
        <Tab.Screen name="Cheltuieli" component={ExpensesStack} options={{ headerShown: false }} />
        <Tab.Screen name="Venituri" component={IncomesStack} options={{ headerShown: false }} />
        <Tab.Screen name="Statistici" component={GraphStack} options={{ headerShown: false }} />
        <Tab.Screen name="Hartă" component={MapScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
