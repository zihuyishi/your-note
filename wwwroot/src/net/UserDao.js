import 'whatwg-fetch';
import Code from '../utils/code';

class UserDao {
    whoami() {
        return fetch('/api/v1/user/whoami').then(response => {
            return response.json();
        }).then(result => {
            if (result.code === Code.OK) {
                return result.data;
            } else {
                return Promise.reject(result.code);
            }
        });
    }
    login(email, password) {
        return fetch('/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.code === Code.OK) {
                return result.data;
            } else {
                return Promise.reject(result.code);
            }
        });
    }
}

export default new UserDao();