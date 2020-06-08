import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {$} from '@core/dom';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    const initialState = {defaultStyles}
    this.initState(initialState)
  }

  get template() {
    return `
    <div class="excel__toolbar-buttons">
      ${createToolbar(this.state)}
    </div>
  `
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
