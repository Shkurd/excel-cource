import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {$} from '@core/dom';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
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

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
      console.log(this.state)
    }
  }
}
