# PONGX: The Ultimate Ping Pong Game 🎮

Welcome to **PONGX**, a feature-rich, multi-mode ping pong game that offers a thrilling gaming experience for all! Whether you’re looking for head-to-head action, an AI challenge, or just want to see bots battle it out, PONGX has it all.

## Game Features 🌟

### 🎲 Game Modes

1. **User vs User (u/vs/u):** Test your skills against another player.
2. **Bot vs Bot (b/vs/b):** Watch AI bots battle it out in a fully simulated environment.
3. **User vs Bot (u/vs/b):** Challenge yourself against a NEAT-trained AI bot.

### 🕹️ Responsive Controls

* **Keyboard Controls:** Use your keyboard to control the paddles.
* **On-Screen Console Buttons:** Optimized for mobile gameplay with intuitive touch controls.

### 📱 Fully Responsive

Adapts seamlessly to any screen size, ensuring a smooth gaming experience on desktop, tablet, or mobile devices.

## Advanced Features 🚀

### 🧠 NEAT Algorithm

PONGX leverages the **NEAT (NeuroEvolution of Augmenting Topologies)** algorithm to train its AI bots. The bot can adapt and improve through simulations, providing a challenging experience for players.

For more details, check the [NEAT.md](./NEAT.md) file.

### 🌌 Visual Effects

* Dynamic **Night Sky** background to enhance visual appeal.
* Smooth animations for ball and paddle movements.

### 🔊 Audio Effects

* Realistic paddle-hit and scoring sounds for immersive gameplay.

### 🏆 Score Tracking

* Automatically tracks scores for both players and announces the winner.

## How It Works 🛠️

### Game Logic

* **Collision Detection:** Handles ball collisions with walls, paddles, and scoring zones.
* **Paddle Control:** Moves paddles based on user input or bot logic.
* **Ball Dynamics:** Adjusts ball speed and direction upon collision.

### Simulator

* **Training Environment:** Uses the NEAT algorithm to simulate multiple game iterations.
* **Bot Evolution:** Improves bot performance by evolving its decision-making capabilities.

### Code Structure

The project’s modular design ensures maintainability and scalability:

```
../PONGX/
  |- package.json
  |- src/
      |- App.jsx
      |- index.jsx
      |- logic/
      |   |- gameLoop.js
      |   |- game.js
      |   |- objects/
      |   |- simulator/
      |   |- bot/
      |- components/
      |- store/
```

For detailed logic, refer to the respective files in the `logic` folder.

## Future Enhancements ✨

* **Multiplayer Mode:** Add online multiplayer functionality.
* **Customizable Themes:** Allow users to choose different backgrounds and paddle styles.
* **AI Improvements:** Enhance bot intelligence using advanced neural network techniques.
* **Power-Ups:** Introduce power-ups to make the game more dynamic and exciting.

## Installation & Usage 📥

### Prerequisites

* Node.js

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/PONGX.git
   ```
2. Navigate to the project directory:

   ```bash
   cd PONGX
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start the application:

   ```bash
   npm start
   ```

## Contributions 🤝

We welcome contributions to enhance PONGX. Feel free to open issues or submit pull requests.

## License 📜

This project is licensed under the MIT License.

---

### Have Fun Playing PONGX! 🏓
