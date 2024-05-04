import {atom} from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    user_id: '',
    name: '',
  },
});
