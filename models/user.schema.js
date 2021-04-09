
exports.User = function ({ email, username }) {
    this.email = email;
    this.username = username;
    this.credential = {
        method: 'Bearer',
        token: null,
    }
}