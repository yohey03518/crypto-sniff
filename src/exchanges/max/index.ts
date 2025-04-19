import WebSocket from 'ws';
import { MaxConfig, MaxTradeMessage, MaxSubscriptionMessage, MaxBookMessage } from './types';

export class MaxExchange {
    private ws: WebSocket | null = null;
    private config: MaxConfig;

    constructor(config: MaxConfig) {
        this.config = config;
    }

    public connect(): void {
        if (this.ws) {
            this.ws.close();
        }

        this.ws = new WebSocket(this.config.wsUrl);

        this.ws.on('open', () => {
            console.log('Connected to Max Exchange WebSocket');
            this.subscribe();
        });

        this.ws.on('message', (data: Buffer) => {
            try {
                // console.log(data.toString());
                const message = JSON.parse(data.toString());
                this.handleMessage(message);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        this.ws.on('close', () => {
            console.log('WebSocket connection closed');
            this.ws = null;
            // Attempt to reconnect after 5 seconds
            setTimeout(() => this.connect(), 5000);
        });

        // Keep connection alive with ping
        setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.ping("keepalive");
            }
        }, 30000);
    }

    private subscribe(): void {
        if (!this.ws) return;

        const subscribeMessage = {
            action: 'sub',
            subscriptions: [
                {channel: "book", market: "btctwd", depth: 1},
            ]
        };

        this.ws.send(JSON.stringify(subscribeMessage));
    }

    private handleMessage(message: MaxTradeMessage | MaxSubscriptionMessage | MaxBookMessage): void {
        if ('c' in message && message.c === 'book') {
            this.handleBookMessage(message);
            return;
        }

        if (!('e' in message)) return;

        switch (message.e) {
            case 'trade':
                console.log(`BTC/TWD Trade: ${message.p} TWD (Volume: ${message.v} BTC, Side: ${message.tr})`);
                break;
            case 'subscribed':
                console.log('Successfully subscribed to markets:', message.M);
                break;
            case 'unsubscribed':
                console.log('Unsubscribed from markets:', message.M);
                break;
        }
    }

    private handleBookMessage(message: MaxBookMessage): void {
        // Handle asks (sell orders)
        message.a.forEach(([price, volume]) => {
            if (volume === '0') {
                console.log(`Ask removed at price: ${price} TWD`);
            } else {
                console.log(`Ask update - Price: ${price} TWD, Volume: ${volume} BTC`);
            }
        });

        // Handle bids (buy orders)
        message.b.forEach(([price, volume]) => {
            if (volume === '0') {
                console.log(`Bid removed at price: ${price} TWD`);
            } else {
                console.log(`Bid update - Price: ${price} TWD, Volume: ${volume} BTC`);
            }
        });
    }

    public disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
} 