/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

import { Near, utils } from 'near-api-js';

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
  async accountName() {
    const res = await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'accountName',
    });

    return res;
  }
  async getUser(user) {
    let res = await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'getUser',
      args: { user },
    });
    if (Object.keys(res).length) {
      res.deadline = Number(res.deadline.slice(0, -6));
    } else {
      res = '';
    }
    return res;
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
