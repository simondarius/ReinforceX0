import React, { useState, useEffect } from 'react';
import QLearningAgent from './agents/QLearningAgent'
import QLearningDisplay from './components/QLearningDisplay';
import { View, Text, TouchableOpacity, StyleSheet,Image,ScrollView,SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [qLearning, setQLearning] = useState(false);
  const [titleText,setTitleText]=useState("Press button to load algorithm!");
  const [turn, setTurn] = useState('X');
  const [transition,setTransition]=useState(false);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [qAgent,setQAgent]=useState(new QLearningAgent());

  useEffect(() => {
    
  }, [qLearning,titleText]);
  useEffect(()=>{
  },[board])
  
  useEffect(()=>{
    if(turn==='O'){
      const newBoard = [...board];
      boxIndex=qAgent.getPolicy(board);
      newBoard[boxIndex-1]=turn;
      agentReward=checkWinner(newBoard);
      qAgent.updatePolicy(agentReward,newBoard);
      if(agentReward==-0.15){
        setBoard(newBoard);
      }else{
        setBoard(Array(9).fill(""));
      }
      setTurn('X')
    }
  },[turn])
  const updateLrValue = (newValue) => {
    qAgent.lr = newValue;
  };
  const updateDfValue = (newValue) => {
    qAgent.df = newValue;
  };
  const updateEpsValue = (newValue) => {
    qAgent.epsilon = newValue;
  };

  const SaveAgent = async () => {
    try {
      await AsyncStorage.setItem('qValues', JSON.stringify(qAgent.qValues));
      console.log('Agent saved successfully.');
    } catch (error) {
      console.log('Error saving agent:', error);
    }
  };
  
  const LoadAgent = () => {
    AsyncStorage.getItem('qValues')
      .then((qValues) => {
        if (qValues !== null) { 
          qAgent.qValues = JSON.parse(qValues);
          console.log('Agent loaded successfully.');
        } else {
          qAgent.qValues = {}; 
          SaveAgent(); 
        }
      })
      .catch((error) => {
        console.log('Error loading agent:', error);
      });
  };
  
  const animateRipple = (ref) => {
    if (ref && transition) {
      ref.rubberBand(1000).then((endState) => {
        if (endState.finished) {
          setTransition(false);
        }
      });
    }
  };

  const handleBoxPress = (boxIndex) => {
    if (board[boxIndex] != ""){
        console.log("Unlawful box press!");
        return;
    }  
    if(turn==='X'){
      const newBoard = [...board];
      newBoard[boxIndex] = turn;
      setBoard(newBoard);
      if(checkWinner(newBoard)==-1){
        setBoard(Array(9).fill(''));
      }else{
        setTurn('O')
      }
      
    }else{
      console.log("User tried pressing during agent turn!")
    }
    
  };

  const checkWinner = (boardConfig) => {
    
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
    ];
    let agentReward=-0.15;
    if(!boardConfig.includes(''))agentReward=0;
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (boardConfig[a] && boardConfig[a] === boardConfig[b] && boardConfig[a] === boardConfig[c]) {
         
        console.log(`${boardConfig[a]} Wins!`)
        if(boardConfig[a]==="X")agentReward=-1;
        if(boardConfig[a]==="O")agentReward=1;
        break;
      }
    }
    
    return agentReward;
  };
  

  return (
    <ScrollView style={styles.scrollRoot}>
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>REINFORCE!</Text>
        <Text style={styles.subTitleText}>{titleText}</Text>
      </View>
      <View style={styles.buttonMenu}>
        <TouchableOpacity style={styles.button} onPress={() => { setTransition(true)
         setQLearning(!qLearning)
         if(!qLearning){
          setTitleText("Q learning loaded!")
          qAgent.attach();
        }else{
          setTitleText("Press button to load algorithm!")
          qAgent.detach();
        }
         
        setBoard(Array(9).fill("")) }}>
          <Text style={styles.buttonText}>QLearning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SARSA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>DQN</Text>
        </TouchableOpacity>
      </View>
      <Animatable.View style={[styles.containerX0, qLearning ? styles.qLearningContainer : null]}>
        {[...Array(9)].map((_, index) => (
          <Animatable.View
            key={index}
            ref={(ref) => animateRipple(ref)}
            style={[styles.boxX0, qLearning ? styles.qLearningBox : null]}
            disabled={!qLearning}
          >
            <TouchableOpacity
              style={styles.touchableBox}
              onPress={() => handleBoxPress(index)}
              disabled={!qLearning}
            >{board[index] === 'X' && (
              <Image  source={require('./assets/image_x.png')} style={styles.imageStyle} />
            )}
            {board[index] === 'O' && (
              <Image  source={require('./assets/image_o.png')} style={styles.imageStyle} />
            )}</TouchableOpacity>
          </Animatable.View>
        ))}
      </Animatable.View>
    <View style={styles.saveLoadContainer}>
      <TouchableOpacity style={styles.saveLoadButton} onPress={SaveAgent}>
      <AntDesign style={styles.saveLoadButtonIcon} name="save" size={24} color="black" />
      <Text style={styles.saveLoadButtonText}>Save Agent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveLoadButton} onPress={LoadAgent}>
      <AntDesign style={styles.saveLoadButtonIcon} name="reload1" size={24} color="black" />
      <Text style={styles.saveLoadButtonText}>Load Agent</Text>
      </TouchableOpacity>
    </View>  
    </View>
    <View style={styles.dashboardView}>
        <QLearningDisplay QLearningAgent={qAgent} updateDfValue={updateDfValue} updateEpsValue={updateEpsValue} updateLrValue={updateLrValue}></QLearningDisplay>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboardView:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom:35,
    paddingTop:10,
  },
  saveLoadContainer:{
   flex:1,
   width:'100%',
   justifyContent:'space-evenly',
   alignItems:'center',
   flexDirection:'row'
  },
  saveLoadButtonText:{
   color:'gray',
   paddingLeft:5,
   fontWeight:'500'
  },
  saveLoadButtonIcon:{
    color:'gray',
   },
  saveLoadButton:{
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#f2f2f2',
    borderRadius:12,
    padding:9,
    borderColor:'lightgray',
    borderWidth:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  scrollRoot: {
    flex:1,
  },

  root: {
    flex: 1,
    marginTop:35,
    alignItems: 'center',
    height:557,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    height: '12.5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop:'5%'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subTitleText:{
    marginTop:5,
    color:'gray',
    fontWeight:'300'
  },
  buttonMenu: {
    height: '12.5%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    height: '33.33%',
    borderRadius: 8,
    marginHorizontal: 16,
    width:'25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: "bold",
    color: 'white'
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    opacity:0.5,
  },
  containerX0: {
    width: '90%',
    minHeight:300,
    height: '50%',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
  qLearningBox: {
    borderColor: '#bfa160'
  },
  qLearningContainer: {
    backgroundColor: '#ffe7a6',
  },
  boxX0: {
    borderColor: 'grey',
    width: '30%',
    height: '33.33%',
    borderWidth: 3,
    borderRadius: 10,
    flexGrow: 1,
  },
  touchableBox: {
    flex: 1, 
  },
});