
import { Connection } from "@solana/web3.js"

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sends a JSON-RPC request to the Xandeum-compatible endpoint to retrieve
 * the result of a transaction previously submitted with a specific signature.
 *
 * This function calls the custom RPC method `getXandeumResult`, which returns
 * the result associated with the given transaction signature.
 *
 * @param connection - The Solana web3 connection object pointing to a Xandeum-compatible RPC endpoint.
 * @param signature - The transaction signature string whose result should be queried.
 *
 * @returns A `Promise<any>` resolving to the parsed JSON response from the RPC server,
 *          which includes the result of the transaction if available.
 */
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