module.exports = class ApplicationPolicy {

    // #1
     constructor(user, record) {
       this.user = user;
       this.record = record;
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
       return this.new() && this.record && this._isOwner();
     }
   }