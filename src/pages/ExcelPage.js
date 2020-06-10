import {Page} from '@/core/Page'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/formula'
import {Table} from '@/components/table/Table'
import {CreateStore} from '@core/store/CreateStore'
import {storage, debounce} from '@core/utils'
import {rootReducer} from '@/redux/rootReducer'
import {normalizeInitialState} from '../redux/initialState'

function storageName(param) {
  return 'excel:'+ param
}


class StateProcessor {
  constructor(client, delay = 300) {
    this.client = client
    this.listen = debounce(this.listen.bind(this), delay)
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}

class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name)
  }

  save(state) {
    storage(this.name, state)
    return Promise.resolve()
  }

  get() {
    return Promise.resolve(storage(this.name))
  }
}

export class ExcelPage extends Page {
  constructor(param) {
    super(param)

    this.storeSub = null
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params),
        400
    )
  }

  async getRoot() {
    const state = await this.processor.get()
    const InitialState = normalizeInitialState(state)
    // создаем единый стор
    const store = new CreateStore(rootReducer, InitialState)

    this.storeSub = store.subscribe(this.processor.listen)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}

