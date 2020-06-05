export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1) // убираем символ "#" из строки
  }

  static get param() {
    return ActiveRoute.path.split('/')[1]
  }
}
