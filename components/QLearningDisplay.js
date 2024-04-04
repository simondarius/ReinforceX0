import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const QLearningDisplay = ({ QLearningAgent }) => {
  const [agentState, setAgentState] = useState(QLearningAgent);

  useEffect(() => {
    console.log("Q LEARNING AGENT UPDATED!")
    console.log(agentState.getIsAttached())

    const handleAgentChange = () => {
      setAgentState({ ...QLearningAgent });
    };

    QLearningAgent.subscribe(handleAgentChange);

  }, [QLearningAgent]);

  const renderStateDisplay = () => {
    const qValues = Object.entries(agentState.qValues).reverse();
    console.log("Got Request to render : ");
    console.log(qValues);
    
    return qValues.map(([state, actions]) => {
      const stateParts = state.split(',');
    
      const stateBoard = stateParts.map((val, index) => {
        let cellColor = 'lightgray'; 
    
        if (val.trim() === '') {
          const actionIndex = index ; 
          const actionValue = (actions[actionIndex] || 0)*75;
          
          
          const maxColorValue = 255; 
          const minColorValue = 100; 
          
          let redValue = maxColorValue; 
          let greenValue = maxColorValue; 
          let blueValue = maxColorValue; 
         
          if (actionValue < 0) {
            greenValue -= Math.abs(actionValue) * maxColorValue; 
            blueValue -= Math.abs(actionValue) * maxColorValue;
          } else if (actionValue > 0) {
            redValue -= Math.abs(actionValue) * maxColorValue; 
            blueValue -= Math.abs(actionValue) * maxColorValue;
          }
          
          cellColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`; 
          console.log(cellColor);
          cellText = actionValue.toFixed(3);
        }
    
        return (
          <View key={index} style={[styles.stateCell, { backgroundColor: cellColor }]}>
            <Text style={val == "" && styles.cellText}>{val == "" ? cellText : val}</Text>
          </View>
        );
      });
    
      return (
        <View key={state} style={styles.stateDisplay}>
          <View style={styles.stateBoard}>{stateBoard}</View>
        </View>
      );
    });
  };
  
  

  

  return (
    <View style={styles.root}>
      <ScrollView style={styles.card}>
        <Text style={styles.cardTitleText}>QMatrix</Text>
        <View style={styles.stateDisplayContainer}>
          {renderStateDisplay()}
        </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 350,
    minHeight:400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minHeight: 350,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom:50,
    borderColor: 'grey',
    borderWidth: 0.455,
    elevation: 10
  },
  cardTitleText: {
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    opacity: 0.3
  },
  stateDisplayContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

  },
  stateDisplay: {
    
  },
  stateBoard: {
    width: 75,
    height:75,
    margin:20,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
  stateCell: {
    borderColor: 'gray',
    width: '30%',
    justifyContent:'center',
    alignItems:'center',
    height: '33.33%',
    borderWidth: 1,
    borderRadius: 5,
    flexGrow: 1,
  },
  actionList: {
    marginLeft: 10
  },
  action: {
    marginBottom: 5
  },
  cellText:{
    color:'gray',
    fontSize:7
  },
});

export default QLearningDisplay;
