import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IncomeContext } from './IncomeContext'; 
import { Alert } from 'react-native';
import { useGoals } from './GoalsContext'; 

export const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {

// State-uri pentru cheltuieli, erori, etc.
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const { incomes } = useContext(IncomeContext); 
  const { goals, handleGoalProgress } = useGoals(); 


// Încarcam cheltuielile stocate
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses));
        }
      } catch (error) {
        console.error('Eroare la încărcarea cheltuielilor:', error);
      }
    };
    loadExpenses();
  }, []);


// Salvam cheltuielile la modificare
  useEffect(() => {
    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      } catch (error) {
        console.error('Eroare la salvarea cheltuielilor:', error);
      }
    };
    saveExpenses();
  }, [expenses]);

  
// Adăugăm o nouă cheltuială
  const addExpense = (description, amount, category) => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Suma cheltuielii trebuie să fie validă!');
      return;
    }

// Calculam totalul veniturilor si cheltuielilor
    const totalIncomes = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    
// Verificsm diferenta dintre venituri si cheltuieli
    const remainingBalance = totalIncomes - (totalExpenses + parsedAmount);
    if (remainingBalance <= 200) {
      Alert.alert(
        "Atenție",
        "Diferența dintre venituri și cheltuieli este mică (200 Lei sau mai puțin). Este recomandat să fii atent la cheltuieli.",
        [{ text: "OK" }]
      );
    }


// Creem un nou obiect si il adaugam in lista
    const newExpense = { id: Date.now(), description, amount: parsedAmount, category };
    setExpenses([...expenses, newExpense]);
  };


// Func pentru stergerea unei cheltuieli
  const removeExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };




  return (
// Return provider pentru contextul cheltuielilor, care ofera datele di functiile
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense, error, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

// Hook de Acces pentru contextul cheltuielilor
export const useExpenses = () => useContext(ExpensesContext);

export default ExpensesProvider;
