import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants'
import {debounce} from '@/core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepape() {
    this.onInput = debounce(this.onInput, 1000)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
    <input type="text" class="input" value="${title}">
    <div class="excel__header-buttons">
        <a class="material-icons">delete</a>
        <a class="material-icons">exit_to_app</a>
    </div>
    `
  }

  onInput(event) {
    console.log('onInput')
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
