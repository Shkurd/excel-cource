import {$} from '../../core/dom';

export function resizeHandler($root, e) {
  return new Promise(resolve => {
    const $resizer = $(e.target)
    // const $parent = $resizer.$el.parentNode (плохой способ)
    // Ниже лучше, то тоже не очень т.к. все еще есть привязка в структуре DOM
    // const $parent = $resizer.$el.closest('.excel__table-row-data-column')
    const $parent = $resizer.closest('[data-type="resizeble"]')
    const coords = $parent.getCoordinates()
    const type = $resizer.data.resize
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    let value

    $resizer.css({
      opacity: 1
    })

    document.onmousemove = e => {
      if (type === 'col') {
        const deltaCol = e.pageX - coords.right
        value = coords.width + deltaCol
        $resizer.css({
          right: -deltaCol + 'px',
          height: 10000 + 'px'
        })
      } else {
        const deltaRow = e.pageY - coords.bottom
        value = coords.height + deltaRow
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
        $parent.css({width: value + 'px'})
        cells.forEach(el => {
          el.style.width = value + 'px'
        })
      } else {
        $parent.css({height: value + 'px'})
      }
      resolve({
        value,
        type,
        id: type === 'col' ? $parent.data.col : $parent.data.row
        // id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}
