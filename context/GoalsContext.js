import React, { createContext, useState, useContext } from 'react';


export const GoalsContext = createContext();

export const GoalsProvider = ({ children }) => {
// State-ul pentru stocarea obiectivelor
  const [goals, setGoals] = useState([]);

// Func pt incarcarea obiectivelor stocate
  const loadGoals = async () => {
    const storedGoals = await AsyncStorage.getItem('goals');
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  };


// Func pt actualizarea progresului unui obiectiv
  const handleGoalProgress = (goalId, amountSpent) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedProgress = ((goal.progress + amountSpent) / goal.targetAmount) * 100;
        return { ...goal, progress: updatedProgress };
      }
      return goal;
    });

    setGoals(updatedGoals);
    AsyncStorage.setItem('goals', JSON.stringify(updatedGoals));
  };



  return (
// Return provider pentru contextul obiectivelor, care ofera datele di functiile
    <GoalsContext.Provider value={{ goals, setGoals, handleGoalProgress }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => useContext(GoalsContext);

export default GoalsProvider;
