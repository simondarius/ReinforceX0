class QLearningAgent{

    isAttached=false;
    subscribers=[];
    test=0;
    constructor(){
        this.test=0;
    }
    getTest(){
        return this.test;
    }
    setTest(test){
        this.test=test;
    }
    attach(){
        this.isAttached=true;
        console.log("Agent now atached!");
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
}
export default QLearningAgent;