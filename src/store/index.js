import { createStore } from 'redux';
import userReducer from './userReducer';

// Usando informaç~eos que serão passadas para o navegador
import { persistReducer, persistStore } from 'redux-persist';

// Aqui eu armazendo meus dados de site no navegador - storage
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'coffecode',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer);

// Salvando todos os dados do usuários e do site
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};