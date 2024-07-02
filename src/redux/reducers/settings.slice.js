import { createSlice } from '@reduxjs/toolkit';

const initialState = {
      themeColor:null,
      themeColorUnsaved:null,
      themeImage:"",
      themeImageUnsaved:null,
      themeImageBlob:"",
      isLoading: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
   saveThemeColor: (state, action) => {
        state.themeColor= action.payload;
    },
    saveThemeColorUnsaved: (state, action) => {
      state.themeColorUnsaved= action.payload;
  },

    saveThemeImage: (state, action) => {
      state.themeImage= action.payload;
  },

  saveThemeImageUnsaved: (state, action) => {
    state.themeImageUnsaved= action.payload;
},

  saveThemeImageBlob: (state, action) => {
    state.themeImageBlob= action.payload;
},
 
    isItLoading: (state, action) => {
      state.isLoading = action.payload;
  },
    clearGroup: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

const { actions, reducer } = settingsSlice;

export const {
 saveThemeColor,
 saveThemeImage,
 saveThemeColorUnsaved,
 saveThemeImageUnsaved,
 saveThemeImageBlob,
 clearGroup

} = actions;

export default reducer;


