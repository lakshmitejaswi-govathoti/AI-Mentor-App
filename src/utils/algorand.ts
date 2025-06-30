import algosdk from 'algosdk';

// Algorand configuration for TestNet
const ALGORAND_SERVER = 'https://testnet-api.algonode.cloud';
const ALGORAND_PORT = 443;
const ALGORAND_TOKEN = '';

export class AlgorandService {
  private algodClient: algosdk.Algodv2;

  constructor() {
    this.algodClient = new algosdk.Algodv2(ALGORAND_TOKEN, ALGORAND_SERVER, ALGORAND_PORT);
  }

  // Generate a new Algorand account
  generateAccount() {
    const account = algosdk.generateAccount();
    return {
      address: account.addr,
      privateKey: account.sk,
      mnemonic: algosdk.secretKeyToMnemonic(account.sk)
    };
  }

  // Create a certificate transaction on Algorand
  async createCertificateTransaction(
    senderAddress: string,
    privateKey: Uint8Array,
    certificateData: {
      recipientName: string;
      courseName: string;
      completionDate: string;
      issuer: string;
    }
  ) {
    try {
      const params = await this.algodClient.getTransactionParams().do();
      
      // Create note with certificate data
      const note = new TextEncoder().encode(JSON.stringify({
        type: 'CAREER_CERTIFICATE',
        ...certificateData,
        timestamp: new Date().toISOString()
      }));

      // Create transaction (sending 0 ALGO to self with certificate data in note)
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: senderAddress,
        to: senderAddress,
        amount: 0,
        note: note,
        suggestedParams: params,
      });

      // Sign transaction
      const signedTxn = txn.signTxn(privateKey);
      
      // Submit transaction
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      
      // Wait for confirmation
      await this.waitForConfirmation(txId);
      
      return {
        transactionId: txId,
        blockchainHash: txId,
        explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
      };
    } catch (error) {
      console.error('Algorand transaction failed:', error);
      throw new Error('Failed to create blockchain certificate');
    }
  }

  // Verify a certificate by transaction ID
  async verifyCertificate(transactionId: string) {
    try {
      const txInfo = await this.algodClient.pendingTransactionInformation(transactionId).do();
      
      if (txInfo.note) {
        const noteString = new TextDecoder().decode(txInfo.note);
        const certificateData = JSON.parse(noteString);
        
        return {
          isValid: true,
          certificateData,
          blockHeight: txInfo['confirmed-round'],
          timestamp: txInfo['round-time']
        };
      }
      
      return { isValid: false };
    } catch (error) {
      console.error('Certificate verification failed:', error);
      return { isValid: false };
    }
  }

  // Wait for transaction confirmation
  private async waitForConfirmation(txId: string) {
    let response = await this.algodClient.status().do();
    let lastround = response['last-round'];
    
    while (true) {
      const pendingInfo = await this.algodClient.pendingTransactionInformation(txId).do();
      if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
        break;
      }
      lastround++;
      await this.algodClient.statusAfterBlock(lastround).do();
    }
  }

  // Get account balance
  async getAccountBalance(address: string) {
    try {
      const accountInfo = await this.algodClient.accountInformation(address).do();
      return accountInfo.amount / 1000000; // Convert microAlgos to Algos
    } catch (error) {
      console.error('Failed to get account balance:', error);
      return 0;
    }
  }
}

export const algorandService = new AlgorandService();