import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(25)
  }

  init() {
    // не перезатираем init родительского класса тут, для этого используем super
    super.init()

    this.selection = new TableSelection()
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$root)
    }
  }
}
