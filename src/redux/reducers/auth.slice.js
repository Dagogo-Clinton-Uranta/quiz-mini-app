import { createSlice } from '@reduxjs/toolkit';

const initialState = {
       user: null,
       school:{},
       error: '',
       message: '',
      isLoading: false,
      profileImages:[],
      registeredWithSocials:false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.user = action.payload;
        state.error = '';
        state.message = '';
      },
      saveSchool:(state, action)=>{
        state.school = action.payload;
      },
    loginFailed: (state, action) => {
        
        state.error = action.payload;
        state.user = null;
      },
      signupPending: (state) => {
        (state.isLoading = true);
          (state.error = '');
          (state.message = '');
      },
      signupFailed: (state, action) => {
        state.error = action.payload;
        state.user = null;
      },
      storeUserData: (state, action) => {
        state.user = action.payload;
      },
      markRegisteredWithSocials: (state, action) => {
        state.registeredWithSocials = action.payload;
      },
      storeProfileImages: (state, action) => {
        state.profileImages = action.payload;
      },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
    logoutFxn: state => {

    },

    logoutSuccess: (state) => {
      // reset: () => initialState
      return {
        ...initialState,
      };
    }
    
  },
});

const { actions, reducer } = loginSlice;

export const {
 loginSuccess,
 saveSchool,
 loginFailed,
 signupPending,
 signupFailed,
 storeUserData,
 storeProfileImages,
 markRegisteredWithSocials,
 clearUser,
 logoutFxn,
 logoutSuccess,
} = actions;

export default reducer;


