// interface to communicate with keyer via serial interface

const serial = navigator.serial ;

export function systemHasSerial() { return navigator.serial !== undefined }
