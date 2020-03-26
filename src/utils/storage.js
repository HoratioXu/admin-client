import store from 'store'

const KEY_USER = 'key_user';

export default {
    saveUser(user) {
        store.set(KEY_USER, user);
    },
    getUser() {
        return store.get(KEY_USER) || {};
    },
    removeUser() {
        store.remove(KEY_USER);
    }
}
