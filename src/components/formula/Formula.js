import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    return `
    <div class="excel__formula-info">
        fx
    </div>
    <div class="excel__formula-input" contenteditable="true" spellcheck="false">
    
    </div>
    `
  }

  onInput(event) {
    console.log(this.$root)
    const text = event.target.textContent.trim();
    this.observer.emit('it is work!', text)
  }

  onClick() {
    console.log('Formula: событие onClick')
  }
}
