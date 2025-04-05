import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {

// State-uri pentru venituri si erori
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);

  
// Incarcam veniturile salvate
  useEffect(() => {
    const loadIncomes = async () => {
      try {
        const savedIncomes = await AsyncStorage.getItem('incomes');
        if (savedIncomes) {
          setIncomes(JSON.parse(savedIncomes));
        }
      } catch (error) {
        console.error('Eroare la încărcarea veniturilor:', error);
      }
    };
    loadIncomes();
  }, []);



// Salvsm veniturile modificate
  useEffect(() => {
    const saveIncomes = async () => {
      try {
        await AsyncStorage.setItem('incomes', JSON.stringify(incomes));
      } catch (error) {
        console.error('Eroare la salvarea veniturilor:', error);
      }
    };
    saveIncomes();
  }, [incomes]);


// Func pentru adaugarea unui venit
  const addIncome = (source, amount) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Suma venitului trebuie să fie validă!');
      return;
    }
    setError(null);
    // Creare si adaugare obiect nou
    const newIncome = { id: Date.now(), source, amount: parsedAmount };
    setIncomes([...incomes, newIncome]);
  };


// Func pentru stergerea unui venit
  const removeIncome = (id) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };



  return (
// Return provider pentru contextul veniturilor, care ofera datele di functiile
    <IncomeContext.Provider value={{ incomes, addIncome, removeIncome, error }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncomes = () => useContext(IncomeContext);


export default IncomeProvider;
