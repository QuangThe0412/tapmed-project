import EventEmitter from "eventemitter3";

export const chatEvent = new EventEmitter();

export function emitReloadChatEvent(data: any) {
  chatEvent.emit("RELOAD_MESSAGES", data);
}

export function removeReloadChatEvent() {
  chatEvent.removeAllListeners("RELOAD_MESSAGES");
}
