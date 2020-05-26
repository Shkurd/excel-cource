import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.prepare()
  }

  prepare() { }

  // toHTML() возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDOMlisteners()
  }

  destroy() {
    this.removeDOMlisteners()
  }
}
