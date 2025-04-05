// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /* Navigation */
  tabBar: {
    backgroundColor: '#2c3e50',
    borderTopColor: '#ecf0f1',
    borderTopWidth: 1,
  },
  tabBarIcon: {
    transform: [{ scale: 1 }],
  },
  tabBarActiveTintColor: '#f39c12',
  tabBarInactiveTintColor: '#95a5a6',
  tabBarShadow: {
    elevation: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  /* Common Styles */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
  box: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding:40,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 120,
    color: 'white',
  },
  label:{
  color:'white',
  fontSize: 20, 

  },
  goalItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  goalText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  /* HomeScreen */
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    color:'white'
  },
  listItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  listText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },

  /* GraphScreen */
  chartContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  /* ExpensesScreen */
  expenseItem: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  expenseText: { 
    fontSize: 18, 
    color: 'white' 
  },
  noExpenses: { 
    textAlign: 'center', 
    fontSize: 18, 
    color: 'gray' 
  },

  /* IncomeScreen */
  incomeItem: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd' 
  },
  incomeText: { 
    fontSize: 18, 
    color: 'white' 
  },

  map: {
    width: '100%',
    height: '100%', // Asigură-te că harta are dimensiuni suficiente
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Schimbăm alignItems pentru a alinia elementele mai sus
    width: '100%', // Asigurăm că containerul se întinde pe întreaga lățime
    paddingTop: 40, // Adăugăm o marjă la începutul ecranului
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },


  // Button
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#FF6347', // Culoare pentru butonul de ștergere
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noExpenses: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noIncomes: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  incomeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerInput: {
    height: 40,
    width: 90,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',  // Fundal deschis
    paddingLeft: 10,
    marginBottom: 15, // Spațiu între elemente
    shadowColor: '#000', // Adăugăm umbră pentru efect vizual
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Umbră pentru Android
  },
});

export default styles;
