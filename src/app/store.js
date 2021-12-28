import { configureStore } from '@reduxjs/toolkit';
import tableTopReducer from "../features/tabletop/TableTopSlice";

export const store = configureStore({
  reducer: {
    tableTopReducer: tableTopReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
});
