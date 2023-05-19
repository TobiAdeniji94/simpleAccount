"use strict";
class Bank {
    constructor(name) {
        this.accounts = [];
        this.bankName = name;
    }
    createAccount(owner, pin) {
        const account = new Account(this, owner, pin);
        this.accounts.push(account);
        return account;
    }
}
class Account {
    constructor(bank, owner, pin) {
        this.balance = 0;
        this.bank = bank;
        this.owner = owner;
        this.pin = pin;
        this.accountNumber = this.generateAccountNumber();
    }
    verifyPin(pin) {
        return this.pin === pin;
    }
    generateAccountNumber() {
        const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        return randomNumber.toString();
    }
    deposit(amount, pin) {
        if (!this.verifyPin(pin)) {
            throw new Error(`Invalid PIN for account of ${this.owner}.`);
        }
        if (amount <= 0) {
            throw new Error('Deposit amount must be a positive number.');
        }
        this.balance += amount;
        console.log(`Deposited ${amount} into the account of ${this.owner}.`);
    }
    withdraw(amount, pin) {
        if (!this.verifyPin(pin)) {
            throw new Error(`Invalid PIN for account of ${this.owner}.`);
        }
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be a positive number.');
        }
        if (this.balance < amount) {
            throw new Error(`Insufficient funds in account of ${this.owner}.`);
        }
        this.balance -= amount;
        console.log(`Withdrew ${amount} from the account of ${this.owner}.`);
    }
    transfer(amount, destinationAccount, pin) {
        if (!this.verifyPin(pin)) {
            throw new Error(`Invalid PIN for account of ${this.owner}.`);
        }
        if (amount <= 0) {
            throw new Error('Transfer amount must be a positive number.');
        }
        // if (this.balance < amount) {
        //     throw new Error(`Insufficient funds in account of ${this.owner}.`);
        // }
        this.balance -= amount;
        destinationAccount.balance += amount;
        console.log(`Transferred ${amount} from the account of ${this.owner} to the account of ${destinationAccount.owner}.`);
    }
    getBalance(pin) {
        if (!this.verifyPin(pin)) {
            throw new Error(`Invalid PIN for account of ${this.owner}.`);
        }
        return this.balance;
    }
    getAccountNumber() {
        return this.accountNumber;
    }
    getDestinationAccount(accountNumber) {
        const destinationAccount = this.bank.accounts.find(account => account.getAccountNumber() === accountNumber);
        if (!destinationAccount) {
            throw new Error(`Destination account with account number ${accountNumber} not found.`);
        }
        return destinationAccount;
    }
}

// Event listener for the "Create User" button
document.getElementById("createBtn").addEventListener("click", createUser);

// Event listeners for the "Deposit" and "Withdraw" buttons
document.getElementById("depositBtn").addEventListener("click", deposit);
document.getElementById("withdrawBtn").addEventListener("click", withdraw);

// Event listener for the "Transfer" button
document.getElementById("transferBtn").addEventListener("click", transfer);

// Bank and Account instances
const bank = new Bank("Bank App");
let currentAccount;

// Function to create a new user
function createUser() {
  const owner = document.getElementById("bank-account-owner").value;
  const pin = parseInt(document.getElementById("pin").value);

  try {
    currentAccount = bank.createAccount(owner, pin);
    document.getElementById("bank-account-number").textContent = currentAccount.getAccountNumber();
  } catch (error) {
    displayMessage(error.message)
  }
}

    // Function to display a message on the page
    function displayMessage(message) {
      document.getElementById("message").textContent = message;
  }

  // Function to handle deposit
  function deposit() {
      const amount = parseFloat(document.getElementById("bank-amount").value);
      const pin = parseInt(document.getElementById("pin").value);

      try {
          currentAccount.deposit(amount, pin);
          displayMessage(`Deposited ${amount} into the account of ${currentAccount.owner}.`);
          document.getElementById("bank-Balance").textContent = currentAccount.getBalance(pin);
      } catch (error) {
          displayMessage(error.message);
      }
  }

  // Function to handle withdrawal
  function withdraw() {
      const amount = parseFloat(document.getElementById("bank-amount").value);
      const pin = parseInt(document.getElementById("pin").value);

      try {
          currentAccount.withdraw(amount, pin);
          displayMessage(`Withdrew ${amount} from the account of ${currentAccount.owner}.`);
          document.getElementById("bank-Balance").textContent = currentAccount.getBalance(pin);
      } catch (error) {
          displayMessage(error.message);
      }
  }

  // Function to handle transfer
  function transfer() {
      const amount = parseFloat(document.getElementById("recipient-amount").value);
      const accountNumber = document.getElementById("recipientAccountNumber").value;
      const pin = parseInt(document.getElementById("pin").value);

      try {
          const destinationAccount = currentAccount.getDestinationAccount(accountNumber);
          currentAccount.transfer(amount, destinationAccount, pin);
          displayMessage(`Transferred ${amount} from the account of ${currentAccount.owner} to the account of ${destinationAccount.owner}.`);
          document.getElementById("bank-Balance").textContent = currentAccount.getBalance(pin);
          document.getElementById("transfer-balance").textContent = destinationAccount.balance;
      } catch (error) {
          displayMessage(error.message);
      }
  }

//# sourceMappingURL=account.js.map