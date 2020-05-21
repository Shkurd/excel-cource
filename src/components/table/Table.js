import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup']
    })
    // let elemWidth = thisevent.target.closest('div').style.width
  }

  toHTML() {
    return createTable(25)
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize') ниже тоже самое:
    //  console.log(event.target.dataset.resize)
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      // const $parent = $resizer.$el.parentNode (плохой способ)
      // Ниже лучше, то тоже не очень т.к. все еще есть привязка в структуре dom
      // const $parent = $resizer.$el.closest('.excel__table-row-data-column')
      const $parent = $resizer.closest('[data-type="resizeble"]')
      const coords = $parent.getCoordinates()

      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = e => {
        console.log('onmousemove')
        const deltaCol = e.pageX - coords.right
        const deltaRow = e.pageY - coords.bottom
        const valueWidth = coords.width + deltaCol
        $parent.$el.style.height = (coords.height + deltaRow) + 'px'
        cells.forEach(el => {
          el.style.width = valueWidth + 'px'
        })
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  /*
  onMousemove(event, ) {
    console.log('onMousemove table component. event.target', event.target)
  }
  */

  onMouseup(event) {
    console.log(' ')
  }

  /*
  onClick(event) {
    console.log('onClick table component. event.target', event.target)
  }
  */
}

// 271 msScripting
// 2947 msRendering

// 234 msScripting
// 3624 msRendering
