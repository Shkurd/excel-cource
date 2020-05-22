import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';

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

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    // не перезатираем init родительского класса тут, для этого используем super
    super.init()

    // console.log($cells.dataset('[data-id]'))
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(e, this.$root)
    } else if (isCell(e)) {
      const target = $(e.target)
      if (e.shiftKey) {
        this.selection.selectGroup(target)
      } else {
        this.selection.select(target)
      }
    }
  }
}
