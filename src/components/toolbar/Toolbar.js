import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="excel__toolbar-buttons">
      <a class="material-icons">format_align_left</a>
      <a class="material-icons">format_align_center</a>
      <a class="material-icons">format_align_right</a>
      <a class="material-icons">format_bold</a>
      <a class="material-icons">format_italic</a>
      <a class="material-icons">format_underline</a>
    </div>
    `
  }

  onClick(e) {
    console.log('Toolbar: событие onClick', e.target)
  }
}
