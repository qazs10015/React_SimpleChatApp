import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  email: '',
  isAvatarImageSet: false,
  avatarImage: '',
  _id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // keep userInfo in sessionStorage to prevent losing data after refreshing
      sessionStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },
    userLogout() {
      sessionStorage.removeItem('user');
      return { ...initialState };
    },
  },
});

export const { setUser, userLogout } = userSlice.actions;

export default userSlice.reducer;
