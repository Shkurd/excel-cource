// реализация паттерна наблюдателя (поведенческий паттерн проектирования)
export class Observer {
  constructor() {
    this.listeners = {}
  }

  // метод обазревателя может также называться: dispatch, fire, trigger и т.д
  // метод уведомляет слушателей (подписчиков) о изменениях
  // Пример уведомления слушателей: table.emit('table:select', {a = 1})
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].array.forEach(listener => {
      listener(...args)
    });
    return true
  }

  // subscribe метод подписчика может также называться: on, listen и т.д
  // подписываемся на уведомления или добавляем нового слушателя
  // Пример подписки: formula.subscribe('table:select', () => {})
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => {
      this.listeners[eventName] =
      this.listeners[eventName].filter(listener => listener !==fn)
    }
  }
}

// Пример:
// const emitter = new Observer()
// const unsub = emitter.subscribe('Anton', data => console.log('Sub:', data))
// emitter.emit('121212', {args: 42})

// setTimeout(()=>{
//   emitter.emit('Anton', {args: 'after 2 seconds'})
// }, 2000)

// setTimeout(()=>{
//   unsub() // отписка
// }, 4000)

// setTimeout(()=>{
//   emitter.emit('Anton', {args: 'after 4 seconds'})
// }, 4000)
