import { atom } from 'recoil';
import { selector } from 'recoil';

export const isAnonymousState = atom({
    key: 'isAnonymousState',
    default: true,
})

export const elapsedTimeState = atom({
    key: 'elapsedTimeState',
    default: 0,
})

export const isRunningState = atom({
    key: 'isRunningState',
    default: true,
})