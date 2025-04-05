import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, ImageBackground, Alert } from 'react-native';
import { ExpensesContext } from '../context/ExpensesContext';
import { IncomeContext } from '../context/IncomeContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'; 

const HomeScreen = () => {

  const navigation = useNavigation();  

// Extragem datele si funcțiile necesare din context
  const { incomes, addIncome, error: incomeError } = useContext(IncomeContext);
  const { expenses, addExpense, error: expenseError } = useContext(ExpensesContext);
  

// State-uri pentru a gestiona inputurile utilizatorului
  const [expense, setExpense] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [income, setIncome] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);


// Calculam totalurile pentru venituri ai cheltuieli
  const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const balance = totalIncomes - totalExpenses;


  // Verificam daca cheltuielile depasesc veniturile
  useEffect(() => {
    if (totalExpenses > totalIncomes) {
      setAlertMessage('Cheltuielile depășesc veniturile disponibile!');
      Alert.alert('Atenție', 'Cheltuielile depășesc veniturile disponibile!', [{ text: 'OK' }]);
    } else {
      setAlertMessage(null); // Resetăm alerta pentru balanta pozitivă
    }
  }, [totalIncomes, totalExpenses]);






  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Gestionare Financiară</Text>

        {/* Afisarea erorilor daca exista */}
        {incomeError && <Text style={styles.error}>{incomeError}</Text>}
        {expenseError && <Text style={styles.error}>{expenseError}</Text>}


        <View style={styles.box}>

          {/* Afisarea totalurilor */}
          <Text style={styles.subtitle}>Venituri totale: {totalIncomes.toFixed(2)} Lei</Text>
          <Text style={styles.subtitle}>Cheltuieli totale: {totalExpenses.toFixed(2)} Lei</Text>

          <Text style={styles.subtitle}>Diferența: {balance} Lei</Text>
        </View>
        <View>
      <Text style={styles.subtitle}>Setează-ți obiective și economisește pe ele!</Text>
      
          {/* Buton pentru navigarea către obiective financiare */}
      <Button
        title="Mergi la Obiective"
        onPress={() => navigation.navigate('Obiective')}
      />
    </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
