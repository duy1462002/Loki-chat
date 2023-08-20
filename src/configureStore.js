import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './store/reducers/rootReducer'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isLogin', 'currentUser', 'combinedId']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
const reduxConfig = () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

export default reduxConfig