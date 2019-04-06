module.exports = class ApplicationPolicy {

    // #1
    constructor(user, record) {
        this.user = user;
        this.record = record;
    }
    _isAdmin() {
        return  !!this.user && (this.user.role == 2);
    }
    _isOwner() {
        return this.record && (this.record.userId == this.user.id);
    }
    new() {
        return !!this.user;
    }
    create() {
        return this.new();
    }
    show() {
        return true;
    }
    edit() {
        return this.new() && this.record;
    }
    delete() {
        console.log(!!this.user)
        console.log(this.user)
        return this.record && (this._isOwner() || this._isAdmin());
    }
}