import {$} from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    $.create()
    const $root = $.create('div')
    $root.classList.add('excel')
    this.components.forEach(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.innerHTML = component.toHTML()
      $root.append($el)
    })

    return $root
  }

  render() {
    // 'beforebegin', 'afterbegin', 'beforeend', 'afterend'.
    // this.$el.insertAdjacentHTML('afterbegin', `<h1> Тест </h1>`)
    this.$el.append(this.getRoot())
  }
}
