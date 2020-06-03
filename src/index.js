//  import "@babel/polyfill";
import './scss/index.scss'
import {Excel} from './components/excel/Excel'
import {Header} from './components/header/Header'
import {Toolbar} from './components/toolbar/Toolbar'
import {Formula} from './components/formula/formula'
import {Table} from './components/table/Table'
import {CreateStore} from '@core/CreateStore'
import {storage, debounce} from '@core/utils'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from './redux/initialState'

// создаем единый стор
const store = new CreateStore(rootReducer, initialState)


const stateListener = debounce(state => {
  console.log('App State: ', state)
  storage('excel-state', state)
}, 500)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
