export interface Item {
    readonly text: string,
    value: number,
}

export interface Currency {
    text: string,
    value: number,
}

export interface ConverterState {
    fromCurrency: Currency,
    inCurrency: Currency,
    exchangeRate: number,
    selectedCurrency: object,
    isManuallyChanged: boolean,
    isInverted: boolean,
    isFethed: boolean,
}

export interface TableState {
    rows: Item[],
    error: string,
    isLoaded: boolean,
}
