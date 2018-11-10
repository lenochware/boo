String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.indef = function() {
    return ("aoeiu".indexOf(this.charAt(0).toLowerCase()) === -1)? "a " + this : "an " + this;
}