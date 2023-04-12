import { createSlice } from '@reduxjs/toolkit';
import { addSignUpForm } from '../apis/signUpFormApi';

const userFormSlice = createSlice({
    name: 'userForm',
    initialState: {
        firstName: 'zzzz',
        lastName: 'zzzz',
        email: '',
    },
    reducers: {
        changeFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        changeLastName: (state, action) => {
            state.lastName = action.payload;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(addSignUpForm.matchFulfilled, (state, action) => {
            state.firstName = '';
            state.lastName = '';
            state.email = '';
        });
    },
});

export const userFormReducer = userFormSlice.reducer;
export const { changeFirstName, changeLastName, changeEmail } = userFormSlice.actions;
