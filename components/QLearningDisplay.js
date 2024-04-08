import React, { useState, useEffect,useRef } from 'react';
import { View, Text, StyleSheet,Easing, ScrollView,Animated } from 'react-native';
import Slider from '@react-native-community/slider';
const QLearningDisplay = ({ QLearningAgent,updateLrValue,updateDfValue,updateEpsValue}) => {
  const [agentState, setAgentState] = useState(QLearningAgent);
  const [backgroundColorAnim] = useState(new Animated.Value(0));
  

  useEffect(() => {
    console.log("Q LEARNING AGENT UPDATED!")
    console.log(agentState.getIsAttached())

    const handleAgentChange = () => {
      setAgentState({ ...QLearningAgent });
    };

    QLearningAgent.subscribe(handleAgentChange);
    
  }, [QLearningAgent]);
  useEffect(() => {
    console.log("Last action changed...")
    Animated.loop(
      Animated.timing(backgroundColorAnim, {
        toValue: 1,
        duration: 1000, 
        easing: Easing.linear,
        useNativeDriver: false, 
      })
    ).start();
  }, [agentState.lastAction]);
  
  const renderStateDisplay = () => {
    const qValues = Object.entries(agentState.qValues).reverse();
    
    const lastState = agentState.lastState
    const lastAction= agentState.lastAction;
    const lastActionSampleType=agentState.lastActionSampleType;
    console.log("LAST ACTION SAMPLE TYPE IS: ");
    console.log(lastActionSampleType);
    const lastIndex = qValues.findIndex(inner=> inner[0]==lastState);
    
  
    if (lastIndex !== -1) {
      const lastStateEntry = qValues.splice(lastIndex, 1)[0];
      qValues.unshift(lastStateEntry);
    }
  
    console.log("Got Request to render : ");
    console.log(qValues);
  
    return qValues.map(([state, actions]) => {

      const stateParts = state.split(',');
      
      const stateBoard = stateParts.map((val, index) => {
        let cellColor = 'lightgray';
        let cellText = '';
        if (val.trim() === '') {
          const actionIndex = index;
          const actionValue = (actions[actionIndex] || 0);
  
          const maxColorValue = 255;
          const minColorValue = 100;
  
          let redValue = maxColorValue;
          let greenValue = maxColorValue;
          let blueValue = maxColorValue;
  
          if (actionValue < 0) {
            greenValue -= Math.abs(actionValue*10) * maxColorValue;
            blueValue -= Math.abs(actionValue*10) * maxColorValue;
          } else if (actionValue > 0) {
            redValue -= Math.abs(actionValue*10) * maxColorValue;
            blueValue -= Math.abs(actionValue*10) * maxColorValue;
          }
  
          cellColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
          cellText = actionValue.toFixed(3);
        }
        outputRange= lastActionSampleType === 'greedy' ? [cellColor,'yellow'] : [cellColor,'#CBC3E3']
        const backgroundColorInterpolate = backgroundColorAnim.interpolate({
          inputRange: [0, 1],
          outputRange: outputRange,
        });
      
        const animatedStyles = {
          backgroundColor: backgroundColorInterpolate,
        };
        return (
          index==lastAction-1 && state==lastState ?
           <Animated.View key={index} style={[styles.stateCell,animatedStyles]}>
               <Text style={val === "" && styles.cellText }>{val === "" ? cellText : val}</Text>
           </Animated.View> 
           :<View key={index} style={[styles.stateCell,{backgroundColor:cellColor}]}>
                 <Text style={val === "" && styles.cellText}>{val === "" ? cellText : val}</Text>
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
    <View style={[styles.root]}>
      <ScrollView style={styles.qCard} nestedScrollEnabled={true}>
        <Text style={styles.cardTitleText}>QMatrix</Text>
        <View style={styles.stateDisplayContainer}>
          {renderStateDisplay()}
        </View>
      </ScrollView>
      <View style={styles.tuningCard}>
        <Text style={styles.cardTitleText}>Tune Parameters</Text>
        <View style={styles.sliderDisplayContainer}>
          <Text style={styles.sliderDisplayContainerText}>Learning Rate: </Text>
        <Slider
        style={{ width: 150, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        value={agentState.lr}
        onValueChange={newValue => updateLrValue(newValue)}
      />
        <Text style={styles.sliderDisplayContainerText}>{ Math.round(agentState.lr* 100) / 100}</Text>
        </View>
        <View style={styles.sliderDisplayContainer}>
          <Text style={styles.sliderDisplayContainerText}>Discount Factor: </Text>
          <Slider
        style={{ width: 150, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        value={agentState.df}
        onValueChange={newValue => updateDfValue(newValue)}
      />
        <Text style={styles.sliderDisplayContainerText}>{ Math.round(agentState.df* 100) / 100}</Text>
        </View>
        <View style={styles.sliderDisplayContainer}>
          <Text style={styles.sliderDisplayContainerText}>Greedy Epsilon: </Text>
          <Slider
        style={{ width: 150, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        value={agentState.epsilon}
        minimumTrackTintColor="purple" 
        maximumTrackTintColor="#c4bb02" 
        thumbTintColor="#purple"
        onValueChange={newValue => updateEpsValue(newValue)}
      />
        <Text style={styles.sliderDisplayContainerText}>{ Math.round(agentState.epsilon* 100) / 100}</Text>
        </View>
      </View>  
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tuningCard:{
    minHeight: 250,
    maxHeight: 250,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom:50,
    borderColor: 'grey',
    borderWidth: 0.455,
    elevation: 10
  },
  sliderDisplayContainer:{
   flexDirection:'row',
   justifyContent:'center',
   alignItems:'center',
   
   marginHorizontal:5,
   marginTop:10
  },
  sliderDisplayContainerText:{
   fontSize:12,
   fontWeight:'500',
   color:'gray'
  },
  qCard: {
    minHeight: 250,
    maxHeight: 250,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom:50,
    borderColor: 'grey',
    borderWidth: 0.455,
    elevation: 10
  },
  infoBoard:{
    backgroundColor:'gray'
  },
  cardTitleText: {
    textAlign: 'center',
    paddingTop: 10,
    fontWeight: 'bold',
    opacity: 0.3
  },
  stateDisplayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,

  },
  stateDisplay: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
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
