import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { signUpFormApi } from './apis/signUpFormApi';
import { userFormReducer } from './slices/userForm';

const store = configureStore({
    reducer: {
        userForm: userFormReducer,
        [signUpFormApi.reducerPath]: signUpFormApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(signUpFormApi.middleware);
    },
});

setupListeners(store.dispatch);

export { store };
export { changeFirstName, changeLastName, changeEmail } from './slices/userForm';
export { useFetchSignUpFormsQuery, useAddSignUpFormMutation, useRemoveSignUpFormMutation } from './apis/signUpFormApi';
