# ⚙️ **PongX Configuration Parameters** 🎮

This document provides a detailed explanation of the **config** parameters used in **PongX**. These settings control various aspects of the game, including paddle dynamics, ball movement, and gameplay types.

---

## 📋 **Configuration Overview**

The `config` object defines key parameters for:

* 🎯 Game settings
* 🏓 Paddle properties
* 🔴 Ball behavior
* 🤖 Simulator dynamics
* 🎨 Color themes
* ⌨️ Keyboard controls

Below is the breakdown of each section:

---

### 🎯 **Game Settings**

| Parameter       | Description                         | Default Value |
| --------------- | ----------------------------------- | ------------- |
| `TARGET_FPS`    | Frames per second for the game loop | `60`          |
| `WINNING_SCORE` | Score required to win the game      | `5`           |

---

### 🏓 **Paddle Properties**

| Parameter       | Description                                  | Default Value |
| --------------- | -------------------------------------------- | ------------- |
| `WIDTH_PERC`    | Paddle width as a percentage of canvas width | `0.02`        |
| `HEIGHT_PERC`   | Paddle height as a percentage of canvas      | `0.15`        |
| `SPACING_PERC`  | Distance between paddle and screen edge      | `0.005`       |
| `VELOCITY_PERC` | Speed of paddle movement                     | `0.02`        |

---

### 🔴 **Ball Behavior**

| Parameter           | Description                                      | Default Value |
| ------------------- | ------------------------------------------------ | ------------- |
| `RADIUS_PERC`       | Ball radius as a percentage of canvas dimensions | `0.02`        |
| `VELOCITY_X_PERC`   | Initial horizontal velocity                      | `0.008`       |
| `VELOCITY_Y_PERC`   | Initial vertical velocity                        | `0.005`       |
| `VELOCITY_MAX_PERC` | Maximum ball velocity                            | `0.02`        |
| `VELOCITY_INC_PERC` | Velocity increment per paddle hit                 | `0.0005`      |

---

### 🤖 **Simulator Dynamics**

| Parameter                | Description                                       | Default Value |
| ------------------------ | ------------------------------------------------- | ------------- |
| `BALL.VELOCITY_X_PERC`   | Simulator ball's initial horizontal velocity      | `0.02`        |
| `BALL.VELOCITY_MAX_PERC` | Simulator ball's maximum velocity                 | `0.04`        |
| `BALL.VELOCITY_INC_PERC` | Simulator ball's velocity increment per paddle hit | `0.02`        |

---

### 🎨 **Colors**

| Color   | Description           | Value                |
| ------- | --------------------- | -------------------- |
| `WHITE` | Primary game elements | `rgb(255, 255, 255)` |
| `BLACK` | Background color      | `rgb(0, 0, 0)`       |

---

### ⌨️ **Keyboard Controls**

The `KEYS_MAP` defines the key bindings for paddle movements:

| Key         | Action      | Description            |
| ----------- | ----------- | ---------------------- |
| `w`         | `leftUp`    | Move left paddle up    |
| `s`         | `leftDown`  | Move left paddle down  |
| `ArrowUp`   | `rightUp`   | Move right paddle up   |
| `ArrowDown` | `rightDown` | Move right paddle down |

---

### 🎮 **Game Modes**

| Mode     | Description  |
| -------- | ------------ |
| `u/vs/b` | User vs Bot  |
| `u/vs/u` | User vs User |
| `b/vs/b` | Bot vs Bot   |

---

## 🌟 **Customization Guide**

Modify the `config` object to tweak game settings:

1️⃣ **Adjust paddle or ball dimensions:**
Change `WIDTH_PERC` or `RADIUS_PERC` to resize paddles or the ball.

2️⃣ **Increase difficulty:**
Raise `VELOCITY_INC_PERC` or lower `WINNING_SCORE`.

3️⃣ **Update key bindings:**
Edit `KEYS_MAP` to redefine paddle controls.

---

## 📜 **License**

This configuration is part of the **PongX** project, licensed under the **MIT License**.

---

Feel free to experiment with these parameters to create your own unique version of **PongX**! 🏓✨
