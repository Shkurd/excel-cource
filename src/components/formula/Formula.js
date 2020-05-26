import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="excel__formula-info">
        fx
    </div>
    <div id="formula" class="excel__formula-input"
    contenteditable="true" spellcheck="false"> </div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')

    this.$on('table: select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput(e) {
    this.$emit('Formula:input', $(e.target).text())
  }

  onClick() {
    console.log('Formula: событие onClick')
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('Formula:done-enter')
    }
  }
}
