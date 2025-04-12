import EventEmitter from "eventemitter3";

export const pingEvent = new EventEmitter();

export function emitPingEvent() {
  pingEvent.emit("PING");
}

export function removePingEvent() {
  pingEvent.removeAllListeners("PING");
}
