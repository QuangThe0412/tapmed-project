import EventEmitter from 'eventemitter3'

export const authEvent = new EventEmitter()

export function emitLogoutEvent() {
  authEvent.emit('LOGOUT')
}

export function removeLogoutEvent() {
  authEvent.removeListener('LOGOUT')
}

export function emitRedirectEvent(destination: string) {
  authEvent.emit('REDIRECT', destination)
}

export function removeRedirectEvent() {
  authEvent.removeListener('REDIRECT')
}
