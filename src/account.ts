class Bank {
  public accounts: Account[] = [];
  readonly bankName: string;

  constructor(name: string) {
    this.bankName = name;
  }

  createAccount(owner: string, pin: number): Account {
    const account = new Account(this, owner, pin);
    this.accounts.push(account);
    return account;
  }
}

class Account {
  private balance: number = 0;
  private readonly bank: Bank;
  readonly owner: string;
  private readonly pin: number;
  private accountNumber: string;

  constructor(bank: Bank, owner: string, pin: number) {
    this.bank = bank;
    this.owner = owner;
    this.pin = pin;
    this.accountNumber = this.generateAccountNumber();
  }

  verifyPin(pin: number): boolean {
    return this.pin === pin;
  }

  private generateAccountNumber(): string {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return randomNumber.toString();
  }

  deposit(amount: number, pin: number): void {
    if (!this.verifyPin(pin)) {
      throw new Error(`Invalid PIN for account of ${this.owner}.`);
    }

    if (amount <= 0) {
      throw new Error('Deposit amount must be a positive number.');
    }

    this.balance += amount;
    console.log(`Deposited ${amount} into the account of ${this.owner}.`);
  }

  withdraw(amount: number, pin: number): void {
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

  transfer(amount: number, destinationAccount: Account, pin: number): void {
    if (!this.verifyPin(pin)) {
      throw new Error(`Invalid PIN for account of ${this.owner}.`);
    }

    if (amount <= 0) {
      throw new Error('Transfer amount must be a positive number.');
    }

    if (this.balance < amount) {
      throw new Error(`Insufficient funds in account of ${this.owner}.`);
    }

    this.balance -= amount;
    destinationAccount.balance += amount;
    console.log(`Transferred ${amount} from the account of ${this.owner} to the account of ${destinationAccount.owner}.`);
  }

  getBalance(pin: number): number {
    if (!this.verifyPin(pin)) {
      throw new Error(`Invalid PIN for account of ${this.owner}.`);
    }

    return this.balance;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }

  getDestinationAccount(accountNumber: string): Account {
    const destinationAccount = this.bank.accounts.find(account => account.getAccountNumber() === accountNumber);
    if (!destinationAccount) {
      throw new Error(`Destination account with account number ${accountNumber} not found.`);
    }
    return destinationAccount;
  }
}
