import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Individual persist configs for each slice
const themePersistConfig = {
  key: "theme",
  storage,
};

const userPersistConfig = {
  key: "user",
  storage,
};

// Persisted reducers for each slice
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Combine reducers
const rootReducer = combineReducers({
  theme: persistedThemeReducer,
  user: persistedUserReducer,
});

// Apply the combined reducer to configureStore with custom middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
