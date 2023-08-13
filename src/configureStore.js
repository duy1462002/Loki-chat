import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './store/reducers/rootReducer'
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isLogin']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
const reduxConfig = () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

export default reduxConfig