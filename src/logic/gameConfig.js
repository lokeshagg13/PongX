const config = {
    GAME: {
        TARGET_FPS: 60,
        WINNING_SCORE: 5,
        ASPECT_RATIO: 1.48,
        RES_HEIGHT: 1180,
    },
    PADDLE: {
        WIDTH_PERC: 0.02,
        HEIGHT_PERC: 0.15,
        SPACING_PERC: 0.005,
        VELOCITY_PERC: 0.02,
    },
    BALL: {
        RADIUS_PERC: 0.02,
        VELOCITY_X_PERC: 0.008,
        VELOCITY_Y_PERC: 0.005,
        VELOCITY_MAX_PERC: 0.02,
        VELOCITY_INC_PERC: 0.0005
    },
    SIMULATOR: {
        BALL: {
            VELOCITY_X_PERC: 0.02,
            VELOCITY_MAX_PERC: 0.04,
            VELOCITY_INC_PERC: 0.02,
        }
    },
    COLORS: {
        WHITE: "rgb(255, 255, 255)",
        BLACK: "rgb(0, 0, 0)"
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

export default config;