import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"; 
import userReducer from "./authSlice"; 
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for redux-persist for the theme slice
const themePersistConfig = {
    key: "theme",
    storage,
};

// Create a persisted reducer for the theme
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

// Combine reducers without persistence for user slice
const rootReducer = combineReducers({
    theme: persistedThemeReducer, 
    user: userReducer,            
});

// Configure store with the combined reducers
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
            },
        }),
});

// Create a persistor for managing persistence 
export const persistor = persistStore(store);