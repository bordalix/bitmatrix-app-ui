import { Balance } from 'marina-provider';
import { MarinaAddressInterface, MarinaTransactionHex, Recipient } from './marina/IMarina';

export interface IWallet {
  exist(): boolean;

  isEnabled(): Promise<boolean>;

  enable(): Promise<void>;

  disable(): Promise<void>;

  getNextAddress(): Promise<MarinaAddressInterface>;

  getAddresses(): Promise<MarinaAddressInterface[]>;

  sendTransaction(recipients: Recipient[]): Promise<MarinaTransactionHex>;

  getBalances(): Promise<Balance[]>;
}
