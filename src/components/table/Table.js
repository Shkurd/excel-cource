import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown']
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
      const $target = $(e.target)
      if (e.shiftKey) {
        const $sells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($sells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowDown',
      'ArrowUp',
      'ArrowRight'
    ]

    const {key} = e
    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
    }
  }
}
