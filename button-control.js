const button = require('rpi-gpio-buttons')([3, 5, 29, 31]);
const EventEmitter = require('events').EventEmitter;
const buttonEventEmitter = new EventEmitter();

button.on('clicked', function(pin) {
    buttonEventEmitter.emit('event', 'buttonClicked', pin);
})

exports.buttonEventEmitter = buttonEventEmitter;