import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function App() {
  const [qLearning, setQLearning] = useState(false);
  const [turn, setTurn] = useState('X');
  const [transition,setTransition]=useState(false);
  const [board, setBoard] = useState(Array(9).fill(""));

  useEffect(() => {
    console.log("qLearning selected!")
  }, [qLearning]);

  useEffect(() => {
    console.log("Board changed!");
    checkWinner();
  }, [board]);

  const animateRipple = (ref) => {
    if (ref && transition) { 
      ref.rubberBand(1000); 
    }
  };

  const handleBoxPress = (boxIndex) => {
    console.log(`Box ${boxIndex + 1} pressed`);
    if (board[boxIndex] != "") return; 

    const newBoard = [...board];
    newBoard[boxIndex] = turn;
    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const checkWinner = () => {
    
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
     
        console.log(`${board[a]} Wins!`)
        setBoard(Array(9).fill(""))
        
        break;
      }
    }
  };


  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>REINFORCE!</Text>
      </View>
      <View style={styles.buttonMenu}>
        <TouchableOpacity style={styles.button} onPress={() => { setTransition(true)
         setQLearning(!qLearning)
         setTransition(false)
        setBoard(Array(9).fill("")) }}>
          <Text style={styles.buttonText}>QLearning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>None</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    height: '12.5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
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
    flexGrow: 1,
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