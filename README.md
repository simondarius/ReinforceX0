# ReinforceX0

## React Native RL Agent Visualizer

This project is a React Native Expo application designed to visualize, train, test, and deploy reinforcement learning (RL) agents using a user-friendly interface. The current implementation provides a simple X-O game environment with a Q-learning agent. Users can modify parameters, visualize the Q-matrix and other parameters, train agents, and play against them. In the future, the application aims to support various types of agents for different environments.

## Features

- **X-O Game Environment:** The application provides a simple X-O (Tic-Tac-Toe) game environment for training and testing RL agents.

- **QLearningAgent Implementation:** Includes a Q-learning agent implementation that learns to play the X-O game.

- **Parameter Modification:** Users can modify parameters such as learning rate (lr), discount factor (df), and exploration rate (epsilon) to observe their effects on agent performance.

- **Visualization:** Users can visualize the Q-matrix and other relevant parameters to gain insights into the agent's learning process.

- **Training and Testing:** The application supports training and testing of RL agents within the X-O game environment.

- **User Interaction:** Users can play against trained agents to test their performance and improve their skills.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/simondarius/ReinforceX0
    ```

2. Navigate to the project directory:

    ```
    cd react-native-rl-agent-visualizer
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the Expo server:

    ```
    npm start
    ```

5. Use Expo Go app on your mobile device or an emulator to view the application.

## Usage

- Upon launching the application, users are presented with the option to load the Q-learning algorithm by pressing a button.

- Users can modify parameters such as learning rate, discount factor, and exploration rate using sliders.

- The application provides a visual representation of the Q-matrix and other parameters using color-coded displays.

- Users can start training the Q-learning agent by toggling the auto-play option, which allows the agent to play against itself and improve its performance over time.

- Additionally, users can save and load trained agents for future use.

- To play against the trained agent, users can interact with the X-O game board and observe the agent's moves.

## Future Enhancements

- **Support for Multiple Agents:** Extend the application to support various types of RL agents for different environments.

- **Enhanced Visualization:** Improve the visualization of agent parameters and learning progress for better user understanding.

- **Custom Environments:** Allow users to define custom environments and train agents for those environments.

- **Online Multiplayer:** Implement online multiplayer functionality to allow users to play against each other in real-time.

## Contributing

Contributions to the project are welcome. To contribute, please fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project was inspired by the desire to create a user-friendly platform for visualizing and experimenting with RL agents.

- Special thanks to the contributors and maintainers of the libraries and tools used in this project.

## Contact

For any inquiries or feedback, please contact [projectmaintainer@example.com](mailto:projectmaintainer@example.com).
