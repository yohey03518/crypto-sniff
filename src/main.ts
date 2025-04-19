// Entry point for the crypto-sniff application

import 'dotenv/config';
import { MaxExchange } from './exchanges/max';

async function main() {
    console.log('Crypto-sniff application starting...');
    
    const maxExchange = new MaxExchange({
        wsUrl: process.env.MAX_WS_URL || 'wss://max-stream.maicoin.com/ws',
        apiKey: process.env.MAX_API_KEY,
        apiSecret: process.env.MAX_API_SECRET
    });

    maxExchange.connect();
    
    // Handle application shutdown
    process.on('SIGINT', () => {
        console.log('Shutting down...');
        maxExchange.disconnect();
        process.exit(0);
    });
}

// Execute the main function
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
}); 