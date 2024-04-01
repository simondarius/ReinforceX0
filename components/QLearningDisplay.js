import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

const QLearningDisplay=({QLearningAgent})=>{
    const [agentState, setAgentState] = useState(QLearningAgent);

    useEffect(() => {
        console.log("Q LEARNING AGENT UPDATED!")
        console.log(agentState.getIsAttached())
    const handleAgentChange = () => {
      setAgentState({ ...QLearningAgent });
    };

    QLearningAgent.subscribe(handleAgentChange);

    return () => {
       
    };
  }, [QLearningAgent]);
    return(
        <View style={styles.root}>
            {agentState.getIsAttached() ? <View>
                <Text>Your score is:</Text>
                <Text>{agentState.getTest()}</Text>
             </View> :
             <View>
                <Text>Agent not attached.</Text>
             </View>
            }
        </View>
    );
}

const styles=StyleSheet.create({
   root:{
       width:100,
       height:100,
       backgroundColor:'blue'
   }
})
export default QLearningDisplay;