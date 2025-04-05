import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Pressable, ImageBackground, TextInput } from 'react-native';
import { ExpensesContext } from '../context/ExpensesContext';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles';

const ExpensesScreen = () => {
  const { expenses, addExpense, removeExpense } = useContext(ExpensesContext);    // Accesăm contextul cheltuielilor

// State-uri pentru gestionarea inputurilor utilizatorului
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(''); 
  const categories = ['Alimente', 'Transport', 'Utilități', 'Distracție', 'Salariu', 'Altele'];


// Funcție pentru eliminarea unei cheltuieli
  const handleRemoveExpense = (id) => {
    removeExpense(id); 
  };

  
// Funcție pentru adăugarea unei cheltuieli
  const handleAddExpense = () => {
    if (description.trim() === '' || amount.trim() === '') return;

    addExpense(description, parseFloat(amount), category); 
    setDescription('');
    setAmount('');
    setCategory('');
  };




  return (
    <ImageBackground
      source={require('../assets/images/background2.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>

        {/* Formularul de adăugare cheltuială */}
        <View style={styles.box}>

          <TextInput
            style={styles.input}
            placeholder="Descriere cheltuială"
            placeholderTextColor="white"  
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Sumă"
            placeholderTextColor="white"  
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

       <Text style={styles.label}>Alege o categorie:</Text>

      <Picker
        selectedValue={category}
        style={styles.pickerInput}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        {categories.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>


    <Pressable style={styles.button} onPress={handleAddExpense}>
      <Text style={styles.buttonText}>Adaugă Cheltuială</Text>
    </Pressable>        
    
    </View>

        {/* Dacă nu sunt cheltuieli, se afișează acest mesaj */}
        {expenses.length === 0 ? (
          <Text style={styles.noExpenses}>Nu există cheltuieli înregistrate.</Text>
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.expenseItem}>
                <Text style={styles.expenseText}>{item.description}: {item.amount} Lei</Text>
                
                
        <Pressable style={styles.removeButton} onPress={() => handleRemoveExpense(item.id)}>
          <Text style={styles.buttonText}>Șterge</Text>
        </Pressable>              
                
                </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default ExpensesScreen;
