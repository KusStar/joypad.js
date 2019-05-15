// Joypad instance

import emmitter from './emitter';
import { EVENTS, AXIS_MOVEMENT_THRESHOLD } from './constants';
import { log, hasVibrationSupport } from './helpers';

const joypad = {
    loopStarted: false,
    instances: {},
    buttonEvents: {
        joypad: []
    },
    settings: {
        axisMovementThreshold: AXIS_MOVEMENT_THRESHOLD
    },
    remove: function (index) {
        return delete this.instances[index];
    },
    on: function (event, callback) {
        switch (event) {
            case EVENTS.CONNECT.ALIAS:
                emmitter.subscribe(EVENTS.CONNECT.ALIAS, callback);
                break;
            case EVENTS.DISCONNECT.ALIAS:
                emmitter.subscribe(EVENTS.DISCONNECT.ALIAS, callback);
                break;
            case EVENTS.BUTTON_PRESS.ALIAS:
                emmitter.subscribe(EVENTS.BUTTON_PRESS.ALIAS, callback);
                break;
            case EVENTS.AXIS_MOVEMENT.ALIAS:
                emmitter.subscribe(EVENTS.AXIS_MOVEMENT.ALIAS, callback);
                break;
        }
    },
    vibrate: function (gamepadInstance, options) {
        const { vibrationActuator } = gamepadInstance;

        if (hasVibrationSupport(vibrationActuator)) {
            const { type } = vibrationActuator;

            return gamepadInstance.vibrationActuator.playEffect(type, options);
        } else {
            log('No vibration actuator interface found - https://developer.mozilla.org/en-US/docs/Web/API/GamepadHapticActuator');
        }
    },
    set: function (settings) {
        const { axisMovementThreshold } = settings;

        this.settings.axisMovementThreshold = axisMovementThreshold;
    }
};

export default joypad;
