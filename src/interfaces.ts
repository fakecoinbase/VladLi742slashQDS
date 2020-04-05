export interface Item {
    readonly text: string,
    value: number,
    isIncreased: boolean,
    isDecreased: boolean,
}

export interface Currency {
    text: string,
    value: number,
    onFocus: boolean,
}

export interface ConverterState {
    fromCurrency: Currency,
    inCurrency: Currency,
    rate: number,
    selectedCurrency: object,
    isInverted: boolean,
    isFethed: boolean,
}

export interface TableState {
    rows: Item[],
    error: string,
    isLoaded: boolean,
}
