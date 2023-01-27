import { atom } from 'recoil';
import { Tweet } from '../types/tweet';
import { UserAuth } from '../types/user';

export const defaultUser = {
    id: '',
    name: '',
    email: '',
    password: '',
}


const userAuthDefault = {
    isAuthenticated: false,
    user: defaultUser
}

export const userAuth = atom<UserAuth>({
    key: 'userAuth',
    default: userAuthDefault
})

export const usersAtom = atom({
    key: 'users',
    default: []
});

export const refresh = atom({
    key: 'refresh',
    default: false
});

export const tweetsList = atom<Tweet[]>({
    key: 'tweetsList',
    default: []
});