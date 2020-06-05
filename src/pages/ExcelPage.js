import {Page} from '@/core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/formula'
import {Table} from '@/components/table/Table'
import {CreateStore} from '@core/CreateStore'
import {storage, debounce} from '@core/utils'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'


export class ExcelPage extends Page {
  getRoot() {
    // создаем единый стор
    const store = new CreateStore(rootReducer, initialState)

    const stateListener = debounce(state => {
      console.log('App State: ', state)
      storage('excel-state', state)
    }, 500)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    console.log('afterRender')
    this.excel.init()
  }

  destroy() {
    console.log('afterDestroy')
    this.excel.destroy()
  }
}
