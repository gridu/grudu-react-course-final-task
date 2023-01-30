import { atom } from 'recoil';
import { Tweet } from '../types/tweet';
import { UserAuth } from '../types/user';

// TODO: namings for all atoms in this file

export const defaultUser = {
    id: '',
    name: '',
    email: '',
    password: '',
}


const userAuthDefault = { // TODO: naming convention for this variable. Not clear what it contains
    isAuthenticated: false,
    user: defaultUser
}

export const userAuth = atom<UserAuth>({ // TODO: naming convention
    key: 'userAuth',
    default: userAuthDefault
})

export const usersAtom = atom({ // TODO: unused var
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