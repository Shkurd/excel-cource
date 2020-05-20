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
      document.onmousemove = e => {
        const delta = e.pageX - coords.right
        $parent.$el.style.width = (coords.width + delta) + 'px'
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
