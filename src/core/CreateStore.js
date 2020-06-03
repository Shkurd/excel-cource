import {rootReducer} from '@/redux/rootReducer'

export class CreateStore {
  constructor(rootReducer, nitialState = {}) {
    this.rootReducer = rootReducer
    this.nitialState = nitialState
    this.state = rootReducer({...this.nitialState}, {type: '__INIT__'})
    this.listeners = []
  }

  // у редаска есть 3 базовых метода: subscribe, dispatch, getState
  subscribe(fn) {
    this.listeners.push(fn)
    // Можно писать как в комменте, а можно чуть усложнить
    // под дльнейшую расширяемость
    // return () => {
    //   listeners.filter(listener => listener !== fn)
    // }
    return {
      unsubscribe() {
        this.listeners = this.listeners.filter(listener => listener(this.state))
      }
    }
  }

  // dispatch() - это и есть по сути вызов экшена.
  // Должен содержать тип экшена (action) в виде строки! Пример: {type:'INIT'}
  dispatch(action) {
    this.state = rootReducer(this.state, action)
    this.listeners.forEach(listener => listener(this.state))
  }

  getState() {
    // Для избежания мутации объекта можно воспользоваться такой записью:
    return JSON.parse(JSON.stringify(this.state))
  }
}


// // возвращает объект с методами редакс (построен на паттерне observer)
// export function createStore(rootReduser, initialState = {}) {
//   let state = rootReduser({...initialState}, {type: '__INIT__'})
//   let listeners = []
//   // у редаска есть 3 базовых метода: subscribe, dispatch, getState
//   return {
//     subscribe(fn) {
//       listeners.push(fn)
//       // Можно писать как в комменте, а можно чуть усложнить
//       // под дльнейшую расширяемость
//       // return () => {
//       //   listeners.filter(listener => listener !== fn)
//       // }
//       return {
//         unsubscribe() {
//           listeners = listeners.filter(listener => listener(state))
//         }
//       }
//     },

//     // dispatch() - это и есть по сути вызов экшена.
//  // Должен содержать тип экшена (action) в виде строки! Пример: {type:'INIT'}
//     dispatch(action) {
//       state = rootReduser(state, action)
//       listeners.forEach(listener => listener(state))
//     },

//     getState() {
//       return state
//     }
//   }
// }
