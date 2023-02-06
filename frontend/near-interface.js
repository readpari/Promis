/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { utils } from 'near-api-js';

export class GuestBook {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getMessages() {
    const messages = await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_messages',
    });
    const res = messages.map((item) => {
      item.bet = utils.format.formatNearAmount(item.bet);
    });

    // const date = new Date(Number(messages[0].deadline));
    // const simple = new Date();
    // console.log(simple.getTime());
    // console.log(simple.getTime() + 3 * 86_400_000);

    // console.log(messages[0].deadline.slice(0, -6));
    // console.log(messages[0].deadline);

    return messages;
  }

  async addMessage(user, bet, hours, days, lastTime) {
    const deposit = utils.format.parseNearAmount(bet.toString());
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'add_message',
      args: { user, hours, days, lastTime },
      deposit,
    });
  }
  async timer(user) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'timer',
      args: { user },
    });
  }
  async loseMoney() {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'loseMoney',
    });
  }

  async clearState() {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'clearState',
    });
  }
  async balanceContract() {
    const balance = await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'balanceContract',
    });
    return balance;
  }
  async getUser() {
    const user = await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'getUser',
    });
    // const date = new Date(Number(messages[0].deadline));
    // const simple = new Date();
    // console.log(simple.getTime());
    // console.log(simple.getTime() + 3 * 86_400_000);

    // console.log(messages[0].deadline.slice(0, -6));
    // console.log(messages[0].deadline);
    if (user) {
      user.deadline = Number(user.deadline.slice(0, -6));
    }
    return user;
  }
  async payBack(account, summa) {
    let deposit = utils.format.parseNearAmount(summa.toString());
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'payBack',
      args: { account_id: account, summa: deposit },
    });
  }

  // async getOldBets() {
  //   const oldBets = await this.wallet.callMethod({
  //     contractId: this.contractId,
  //     method: 'getOldBets',
  //   });
  //   return oldBets;
  // }
}
