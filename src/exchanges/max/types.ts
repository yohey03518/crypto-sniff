export interface MaxConfig {
    wsUrl: string;
    apiKey?: string;
    apiSecret?: string;
}

export interface MaxTradeMessage {
    e: 'trade';              // event type
    M: string;              // market name (e.g., 'btctwd')
    p: string;              // price
    v: string;              // volume
    T: number;              // trade ID
    t: number;              // timestamp
    tr: 'bid' | 'ask';      // taker side
}

export interface MaxSubscriptionMessage {
    e: 'subscribed' | 'unsubscribed';
    M: string[];           // markets
}

export interface MaxBookMessage {
    c: 'book';             // channel
    M: string;             // market
    e: 'snapshot' | 'update'; // event type
    a: [string, string][]; // asks [price, volume][]
    b: [string, string][]; // bids [price, volume][]
    T: number;             // timestamp
    fi: number;            // first id
    li: number;            // last id
    v: number;             // version
} 