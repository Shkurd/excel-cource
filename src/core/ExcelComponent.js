import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.unsubscribers = []
    this.prepare()
  }

  // настраиваем компонент до init
  prepare() { }

  // toHTML() возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // метод с "$" это мето д нашего фреймворка, а без "$" просто одноименный
  // Тут паттерн фасад - взамиодействие через метод $emit с emit observer-a
  // $emit - метод уведомляет слушателей про события "eventName"
  $emit(eventName, ...args) {
    this.observer.emit(eventName, ...args)
  }

  // Тут паттерн фасад - взамиодействие через метод $on с subscribe observer-a
  // $on - подписка на события "eventName"
  $on(eventName, fn) {
    const unsub = this.observer.subscribe(eventName, fn)
    this.unsubscribers.push(unsub) // кладем фукнкию отписки в unsubscribers
  }

  // инициализируем компонент и добавляем DOM слушателей
  init() {
    this.initDOMlisteners()
  }

  // удаляем компонент и чистим DOM слушателей
  destroy() {
    this.removeDOMlisteners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
