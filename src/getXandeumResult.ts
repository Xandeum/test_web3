
import { Connection } from "@solana/web3.js"

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function getXandeumResult(  connection: Connection, signature: string): Promise<any> {
    const url = connection.rpcEndpoint;
    const requestBody = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getXandeumResult',
        params: [signature]
    }

    // sleeping To let the transaction process
    await sleep(5000);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
        const errorText = await response.text();
        return new Error(`Error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json()
    return data
}