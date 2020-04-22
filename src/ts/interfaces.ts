export interface Item {
  readonly text: string;
  value: number;
  isIncreased: boolean;
  isDecreased: boolean;
}

export interface Currency {
  text: string;
  value: number;
  onFocus: boolean;
}

export interface ConverterState {
  fromCurrency: Currency;
  inCurrency: Currency;
  rate: number;
  selectedCurrency: object;
  isInverted: boolean;
  isFethed: boolean;
}

export interface TableState {
  rows: Item[];
  error: string;
  isFetched: boolean;
}

export interface DataAction {
  readonly data: Item;
}

export interface DataFailedAction {
  readonly type: string;
  message: string;
}

export interface ConverterAction {
  value: number;
  currency: string;
  rate: number;
}
