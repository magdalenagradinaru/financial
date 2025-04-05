import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Button, ImageBackground, TextInput, Pressable } from 'react-native';
import { IncomeContext } from '../context/IncomeContext';
import styles from '../styles'; 

const IncomeScreen = () => {

// Accesam contextul veniturilor
  const { incomes, addIncome, removeIncome } = useContext(IncomeContext);


// State-uri pentru a gestiona inputurile userilor
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');


// Func pentru eliminarea unui venit
  const handleRemoveIncome = (id) => {
    removeIncome(id);
  };


// Functie pentru adaugarea unui venit
  const handleAddIncome = () => {
    if (source.trim() === '' || amount.trim() === '') return;

    addIncome(source, parseFloat(amount)); 
    setSource('');
    setAmount('');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background2.jpg')} // Calea către imaginea ta
      style={styles.background}
    >
      <View style={styles.container}>

        {/* Formularul de adăugare venit */}
        <View style={styles.box}>

          <TextInput
            style={styles.input}
            placeholder="Sursă venit"
            placeholderTextColor="white"  
            value={source}
            onChangeText={setSource}
          />
          <TextInput
            style={styles.input}
            placeholder="Sumă"
            placeholderTextColor="white"  
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Pressable style={styles.button} onPress={handleAddIncome}>
            <Text style={styles.buttonText}>Adaugă Venit</Text>
          </Pressable>

        </View>

        {/* Dacă nu sunt venituri, se afișează acest mesaj - operator ternar*/}
        {incomes.length === 0 ? (
          <Text style={styles.noIncomes}>Nu există venituri înregistrate.</Text>
        ) : (
          
          <FlatList
          data={incomes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.incomeItem}>
              <Text style={styles.incomeText}>{item.source}: {item.amount} Lei</Text>

        {/* Pressable pentru ștergere */}
              <Pressable style={styles.removeButton} onPress={() => handleRemoveIncome(item.id)}>
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

export default IncomeScreen;
