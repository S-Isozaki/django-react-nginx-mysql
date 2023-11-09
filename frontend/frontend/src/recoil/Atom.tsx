import { atom } from 'recoil';

export const isAnonymousState = atom({
    key: 'isAnonymousState',
    default: true,
})