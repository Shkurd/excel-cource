import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '../../core/dom';
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(25, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    // не перезатираем init родительского класса тут, для этого используем super
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('Formula:input', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('Formula:done-enter', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table: select', $cell)
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.$root, e)
      this.$dispatch(actions.tableResize(data))
    } catch {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $sells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($sells)
      } else {
        this.selectCell($target)
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
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(e) {
    this.updateTextInStore($(event.target).text())
  }
}
