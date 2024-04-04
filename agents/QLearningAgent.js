import AsyncStorage from '@react-native-async-storage/async-storage';
class QLearningAgent{

    constructor(){
        this.test=0;
        this.qValues={};
        this.isAttached=false;
        
        this.subscribers=[];
        this.epsilon=0.5;
        this.lastState=null;
        this.lr=0.1;
        this.df=0.3;
        this.lastAction=null;
    }
    getTest(){
        return this.test;
    }
    setTest(test){
        this.test=test;
    }
    async attach(){
        try {
            const qValues = await AsyncStorage.getItem('qValues');
            if (qValues !== null) {
              this.qValues = JSON.parse(qValues);
              this.isAttached=true;
            }else{
              await AsyncStorage.setItem('qValues',JSON.stringify(this.qValues))  
            }
          } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
          }
    } 
    detach(){
        console.log("Agent now detached!");
        this.isAttached=false;
    }
    getIsAttached(){
        return this.isAttached;
    }
    notifySubscribers() {
        this.subscribers.forEach((subscriber) => {
          subscriber();
        });
      }
    
      subscribe(callback) {
        this.subscribers.push(callback);
    }
    getArgMax(state){
        let maxKey;
        let maxValue = -Infinity;
        const obj=this.qValues[state]; 
        for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
        if (obj[key] > maxValue) {
            maxValue = obj[key];
            maxKey = key;
        }
       }
     }
     return maxKey;
    }
    sampleRandom(state){
        const obj=this.qValues[state]; 
        const keys = Object.keys(obj);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        return randomKey;
    }
    getPolicy(state) {
        try{
            let key = null;
            if (this.qValues.hasOwnProperty(state)) {
                if (Math.random() < this.epsilon) {
                   
                    key = this.getArgMax(state);
                } else {
                    key = this.sampleRandom(state);
                }
            } else {
                const emptyIndexes = state.reduce((acc, val, index) => {
                    if (val === '') {
                        acc.push(index + 1);
                    }
                    return acc;
                }, []);
                
                const initialStateValues = emptyIndexes.map(index => ({ [index]: 0 }));
                this.qValues[state] = Object.assign({}, ...initialStateValues);
                key = this.sampleRandom(state);
            }
            this.lastAction=key;
            this.lastState=state;
            return key;
        }catch(Error){
           console.log(Error);
           throw Error;
        }
        
    }
    updatePolicy(reward,new_state){
        try{
        console.log("===== EPISODE ======")
        console.log("started in state "+this.lastState);
        console.log("transitioned to "+new_state);
        console.log("by performing action "+this.lastAction);
        console.log("got reward "+reward);
        if(this.lastAction && this.lastState){
           let argmax_next=0;
           if(this.qValues.hasOwnProperty(new_state)){
             argmax_next=this.getArgMax(new_state);
           }
           this.qValues[this.lastState][this.lastAction]+=this.lr*(reward+this.df*argmax_next-this.qValues[this.lastState][this.lastAction]);
        }
        console.log("===== EPISODE END ======")
       }catch(Error){
           console.log(Error);
           throw Error;
       }
    }
    


}
export default QLearningAgent;