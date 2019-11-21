import { getClient } from '../helpers/getClient';
import * as ecc from 'eosjs-ecc';
import * as ecies from 'standard-ecies';
<<<<<<< HEAD
const crypto = require('crypto');

const contract = 'trinhtan1234';

=======

const crypto = require('crypto');

// const contract = process.env.REACT_APP_EOS_CONTRACT_NAME;
const contract = 'trinhtan3333';

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

  static async register({ username, key }) {
    const service = await (await getClient()).service('vaccounts', contract);
    return new Promise((resolve, reject) => {
      localStorage.setItem('user_account', username);
      localStorage.setItem('user_key', key);
      service
        .push_liquid_account_transaction(contract, key, 'regaccount', {
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
    var username = 'chientm';
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

  static async endgame(score) {
    const service = await (await getClient()).service('vaccounts', contract);
    let key = '5Jomz7k16rnz64VuKDo3jKuvTYADifP5Cb3U2sUmoStyBuA1SK4';

    return new Promise((resolve, reject) => {
      // localStorage.getItem('user_account');
      // localStorage.getItem('user_key');
      service
        .push_liquid_account_transaction(contract, key, 'endgame', {
          date: 10,
          vaccount: 'trinhtan2345',
          game_data: { mapState: [], score: 100, flag_continue: false }
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

  static async addaccount(btc, eth, eos) {
    const service = await (await getClient()).service('vaccounts', contract);
    var vaccount = 'chientm';
    const privateKey = '5JfrrD7khysHe9Z4igmUwuUuRVUfrtBJqkbTjmzda7CGvGpGyuA';
    return await service.push_liquid_account_transaction(contract, privateKey, 'addaccount', {
      vaccount,
      btc: [],
      eth: [],
      eos: []
    });
  }
>>>>>>> api service call endgame action
}

export default ApiService;
