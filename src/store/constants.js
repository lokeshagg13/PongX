const constants = {
    TARGET_FPS: 60,
    PADDLE_VELOCITY_PERC: 0.02,
    BALL_VELOCITY_X_PERC: 0.008,
    BALL_VELOCITY_Y_PERC: 0.005,
    BALL_VELOCITY_MAX_PERC: 0.02,
    BALL_VELOCITY_INC_PERC: 0.0005,
    SIMULATOR_BALL_VELOCITY_X_PERC: 0.02,
    SIMULATOR_BALL_VELOCITY_MAX_PERC: 0.04,
    SIMULATOR_BALL_VELOCITY_INC_PERC: 0.02,
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
    KEYS_MAP: {
        'w': 'leftUp',
        's': 'leftDown',
        'ArrowUp': 'rightUp',
        'ArrowDown': 'rightDown',
        'leftDown': 's',
        'leftUp': 'w',
        'rightDown': 'ArrowDown',
        'rightUp': 'ArrowUp'
    },
    GAME_TYPES: [
        "u/vs/b",
        "u/vs/u",
        "b/vs/b",
    ]
}

export default constants;