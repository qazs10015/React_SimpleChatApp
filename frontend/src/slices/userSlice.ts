import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  email: '',
  isAvatarImageSet: false,
  avatarImage: '',
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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
