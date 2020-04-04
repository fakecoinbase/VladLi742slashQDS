export interface Item {
    readonly text: string,
    value: number,
}

export interface Currency {
    text: string,
    value: number,
    onFocus: boolean,
}

export interface ConverterState {
    fromCurrency: Currency,
    inCurrency: Currency,
    exchangeRate: number,
    selectedCurrency: object,
    isInverted: boolean,
    isFethed: boolean,
}

export interface TableState {
    rows: Item[],
    error: string,
    isLoaded: boolean,
}
