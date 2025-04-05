import React, { useContext } from 'react';
import { View, Text, Dimensions,ImageBackground } from 'react-native';
import { ExpensesContext } from '../context/ExpensesContext';
import { IncomeContext } from '../context/IncomeContext';
import { PieChart } from 'react-native-chart-kit';  
import { BarChart } from 'react-native-chart-kit';  
import styles from '../styles'; 

const GraphScreen = () => {

// Accesm contextul pentru veniturile si cheltuielile userului
  const { incomes } = useContext(IncomeContext);
  const { expenses } = useContext(ExpensesContext);

// Calculam totalul veniturilor și cheltuielilor
  const totalIncomes = Array.isArray(incomes) ? incomes.reduce((total, income) => total + income.amount, 0) : 0;
  const totalExpenses = Array.isArray(expenses) ? expenses.reduce((total, expense) => total + expense.amount, 0) : 0;

// Pregatim datele pentru graficul pie 
  const chartData = [
    {
      name: 'Venituri',
      population: totalIncomes,
      color: 'pink',
      legendFontColor: 'black',
      legendFontSize: 17
    },
    {
      name: 'Cheltuieli',
      population: totalExpenses,
      color: 'red',
      legendFontColor: 'black',
      legendFontSize: 17
    }
  ];


// Func pentru a calcula categoriile de cheltuieli
  const getCategoryData = () => {
    const categoryMap = {};
// Verif daca expenses este un array valid
    if (Array.isArray(expenses)) {
      expenses.forEach((expense) => {
// daca categoria exista deja in map, adauga suma, altfel adauga categoria
        if (categoryMap[expense.category]) {
          categoryMap[expense.category] += expense.amount;
        } else {
          categoryMap[expense.category] = expense.amount;
        }
      });
    }
    const categoryLabels = Object.keys(categoryMap);
    const categoryValues = Object.values(categoryMap);
    return { categoryLabels, categoryValues };
  };
// Obtinem categoriile si valorile
  const { categoryLabels, categoryValues } = getCategoryData();




  return (
    <ImageBackground
      source={require('../assets/images/background2.jpg')} 
      style={styles.background}
    >
    <View style={styles.container}>

{/* Graficul de tip Bar Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.subtitle}>Cheltuieli pe categorii</Text>
        <BarChart
          data={{
            labels: categoryLabels,   // Etichete
            datasets: [
              {
                data: categoryValues, // Valori
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} 
          height={220} 
          fromZero={true} 
          chartConfig={{
            backgroundColor: 'gray',
            backgroundGradientFrom: 'gray',
            backgroundGradientTo: 'black',
            decimalPlaces: 2, 
            color: (opacity = 4) => `rgba(111, 199, 114, ${opacity})`, 
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

{/* Graficul de tip Pie Chart */}

      <View style={styles.chartContainer}>
        <Text style={styles.subtitle}>Venituri vs Cheltuieli</Text>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 40} 
          height={220} 
          chartConfig={{
            backgroundColor: '#ff6347', 
            backgroundGradientFrom: '#fffacd', 
            backgroundGradientTo: '#f0e68c', 
            decimalPlaces: 2, 
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          accessor="population"
          backgroundColor="gray"
          paddingLeft="15"
          center={[10, 10]}
        />
      </View>
    </View>
        </ImageBackground>
    
  );
};

export default GraphScreen;
