const constants = {
    TARGET_FPS: 60,
    PADDLE_VELOCITY_PERC: 0.02,
    BALL_VELOCITY_X_PERC: 0.005,
    BALL_VELOCITY_Y_MAX_PERC: 0.005,
    WINNING_SCORE: 5,
    COLORS: {
        WHITE: "rgb(255, 255, 255)",
        BLACK: "rgb(0, 0, 0)"
    },
    SPACING: {
        PADDING_PERC: 0.005,
    },
    SIZING: {
        PADDLE_WIDTH_PERC: 0.02,
        PADDLE_HEIGHT_PERC: 0.15,
        BALL_RADIUS_PERC: 0.02,
    },
    GAME_TYPES: [
        "u/vs/b",
        "u/vs/u",
        "b/vs/b",
    ]
}

export default constants;