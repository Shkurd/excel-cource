
export class TableSelection {
  // обращаться к className можно через название класса TableSelection.className
  static className = 'selected'
  constructor($root) {
    this.group = []
  }

  // $el instanceof DOM === true
  select($el) {
    this.clear()
    this.group.push($el)
    // $el.addClass('selected')
    $el.addClass(TableSelection.className)
  }

  clear() {
    this.group = this.group.forEach(($el)=>{
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }

  selectGroup($el) {
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }
}
