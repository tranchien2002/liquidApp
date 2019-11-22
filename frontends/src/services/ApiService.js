import { getClient } from '../helpers/getClient';
import * as ecc from 'eosjs-ecc';
import * as ecies from 'standard-ecies';
<<<<<<< HEAD
const crypto = require('crypto');

const contract = 'trinhtan1234';

=======

const crypto = require('crypto');

const contract = 'trinhtan2345';

>>>>>>> api service call endgame action
class ApiService {
  static encrypt(message) {
    let pubKey = ecc.privateToPublic(localStorage.getItem('user_key'));
    const pubBuffer = ecc
      .PublicKey(pubKey)
      .toUncompressed()
      .toBuffer();
    const messageBuffer = Buffer.from(message, 'utf8');
    const encryptedBuffer = ecies.encrypt(pubBuffer, messageBuffer);
    return encryptedBuffer;
  }

  static decrypt(encryptArr) {
    if (!encryptArr) return [];
    let decryptArr = [];
    for (let i = 0; i < encryptArr.length; i++) {
      const wif = localStorage.getItem('user_key');
      const ecdh = crypto.createECDH('secp256k1');
      const privBuffer = ecc.PrivateKey(wif).toBuffer();
      ecdh.setPrivateKey(privBuffer);
      let encryptBuffer = Buffer.from(encryptArr[i].toLowerCase(), 'hex');
      decryptArr.push(ecies.decrypt(ecdh, encryptBuffer).toString());
    }
    return decryptArr;
  }

  static async register() {
    const service = await (await getClient()).service('vaccounts', contract);
    return new Promise((resolve, reject) => {
      // localStorage.setItem('user_account', username);
      // localStorage.setItem('user_key', key);
      service
        .push_liquid_account_transaction(
          contract,
          '5JfrrD7khysHe9Z4igmUwuUuRVUfrtBJqkbTjmzda7CGvGpGyuA',
          'regaccount',
          {
            vaccount: 'chientm2'
          }
        )
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

<<<<<<< HEAD
  static async login({ username, key }) {
    const service = await (await getClient()).service('vaccounts', contract);
    return new Promise((resolve, reject) => {
      localStorage.getItem('user_account');
      localStorage.getItem('user_key');
      service
        .push_liquid_account_transaction(contract, key, 'login', {
          vaccount: username
        })
=======
  static async login() {
    const service = await (await getClient()).service('vaccounts', contract);
    var username = 'chientm2';
    const key = '5JfrrD7khysHe9Z4igmUwuUuRVUfrtBJqkbTjmzda7CGvGpGyuA';
    return new Promise((resolve, reject) => {
      service
        .push_liquid_account_transaction(contract, key, 'login', {
          vaccount: username
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static async endgame() {
    const service = await (await getClient()).service('vaccounts', contract);
    let key = '5JfrrD7khysHe9Z4igmUwuUuRVUfrtBJqkbTjmzda7CGvGpGyuA';

    return new Promise((resolve, reject) => {
      // localStorage.getItem('user_account');
      // localStorage.getItem('user_key');
      service
        .push_liquid_account_transaction(contract, key, 'endgame', {
          date: 10,
          vaccount: 'chientm2',
          score: '100'
        })
>>>>>>> api service call endgame action
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
<<<<<<< HEAD
=======

  static async sortRank() {
    const service = await (await getClient()).service('vaccounts', contract);
    let key = '5JfrrD7khysHe9Z4igmUwuUuRVUfrtBJqkbTjmzda7CGvGpGyuA';

    return new Promise((resolve, reject) => {
      // localStorage.getItem('user_account');
      // localStorage.getItem('user_key');
      service
        .push_liquid_account_transaction(contract, key, 'sortrank', {
          date: 13,
          vaccount: 'chientm2',
          score: '20'
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
<<<<<<< HEAD
>>>>>>> api service call endgame action
=======

  static async getRank() {
    const service = await (await getClient()).service('ipfs', contract);
    try {
      let res = await service.get_vram_row(contract, contract, 'charts', 13);
      console.log(res);
    } catch (e) {
      // if (e.toString().indexOf('key not found') !== -1) {
      //   thisObject.setState({ btcAddressArr: [], ethAddressArr: [], eosAddressArr: [] });
      // }
      console.log(e);
    }
  }
>>>>>>> connect to blockchain
}

export default ApiService;
