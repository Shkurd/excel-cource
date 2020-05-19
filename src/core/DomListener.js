import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMlisteners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemeted in ${this.name || ''} Component`
        )
      }
      this[method] = this[method].bind(this)
      // тоже, что и addEventListener
      this.$root.on(listener, this[method])
    })
  }

  removeDOMlisteners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      // тоже, что и removeEventListener
      this.$root.off(listener, this[method])
    })
  }
}

// Input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
