
export class TableSelection {
  // обращаться к className можно через название класса TableSelection.className
  static className = 'selected'
  constructor($root) {
    this.group = []
    this.current = null
  }

  // $el instanceof DOM === true
  select($el) {
    this.clear()
    this.group.push($el)
    this.current = $el
    // $el.addClass('selected')
    $el.focus().addClass(TableSelection.className)
  }

  clear() {
    this.group = this.group.forEach(($el)=>{
      $el.removeClass(TableSelection.className)
    })
    this.group = []
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}
