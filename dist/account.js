"use strict";
class Account {
    constructor(bankName, owner, balance, pin) {
        this._bankName = bankName;
        this._owner = owner;
        this._balance = balance;
        this._pin = pin;
    }
    // Getters for private properties
    get bankName() {
        return this._bankName;
    }
    get owner() {
        return this._owner;
    }
    get balance() {
        return this._balance;
    }
    // Deposit money into the account
    deposit(pin, amount) {
        if (this._pin !== pin) {
            return false;
        }
        this._balance += amount;
        return true;
    }
    // Withdraw money from the account
    withdraw(pin, amount) {
        if (this._pin !== pin || this._balance < amount) {
            return false;
        }
        this._balance -= amount;
        return true;
    }
    // Transfer money from this account to another account
    transfer(pin, amount, account) {
        if (this._pin !== pin || this._balance < amount) {
            return false;
        }
        this._balance -= amount;
        account.deposit(pin, amount);
        return true;
    }
}
//# sourceMappingURL=account.js.map