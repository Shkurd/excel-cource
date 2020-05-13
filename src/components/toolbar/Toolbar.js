import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

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
}
