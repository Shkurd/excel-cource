import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  toHTML() {
    return `
    <input type="text" class="input" value=" + Новая таблица">
    <div class="excel__header-buttons">
        <a class="material-icons">delete</a>
        <a class="material-icons">exit_to_app</a>
    </div>
    `
  }
}
