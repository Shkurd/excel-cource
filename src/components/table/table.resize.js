import {$} from '../../core/dom';

export function resizeHandler(e, $root) {
  const $resizer = $(e.target)
  // const $parent = $resizer.$el.parentNode (плохой способ)
  // Ниже лучше, то тоже не очень т.к. все еще есть привязка в структуре DOM
  // const $parent = $resizer.$el.closest('.excel__table-row-data-column')
  const $parent = $resizer.closest('[data-type="resizeble"]')
  const coords = $parent.getCoordinates()
  const type = $resizer.data.resize
  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
  let valueWidth
  let valueHeight

  $resizer.css({
    opacity: 1
  })

  document.onmousemove = e => {
    console.log('onmousemove')
    if (type === 'col') {
      const deltaCol = e.pageX - coords.right
      valueWidth = coords.width + deltaCol
      $resizer.css({
        right: -deltaCol + 'px',
        height: 10000 + 'px'
      })
    } else {
      const deltaRow = e.pageY - coords.bottom
      valueHeight = coords.height + deltaRow
      $resizer.css({
        bottom: -deltaRow + 'px',
        width: 10000 + 'px'
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({width: valueWidth + 'px'})
      cells.forEach(el => {
        el.style.width = valueWidth + 'px'
      })
      $resizer.css({
        opacity: 0,
        height: 100 + '%',
        right: 0
      })
    } else {
      $parent.css({height: valueHeight + 'px'})
      $resizer.css({
        opacity: 0,
        bottom: 0,
        width: 100 + '%'
      })
    }
  }
}
