export type DealerType = 'dealer' | 'installer';

export interface Dealer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  messenger: string;
  coordinates: [number, number];
  type: DealerType;
}
