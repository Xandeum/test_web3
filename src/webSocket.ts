import WebSocket from 'ws'
import { PublicKey, Transaction, TransactionInstruction, Keypair, Connection, clusterApiUrl,ComputeBudgetProgram } from "@solana/web3.js"

/**
 * Represents the structure of result data received from a WebSocket subscription.
 *
 * - `fsid` (optional): The file system ID returned from the result.
 * - `status` (optional): The status of the transaction or operation.
 * - `data` (optional): Any custom payload or message associated with the result.
 * - `subscription` (optional): The ID of the WebSocket subscription.
 */
type ResultValue = {
  fsid?: string
  status?: string
  data?: any
  subscription?: string
}

/**
 * Opens a WebSocket connection and subscribes to the result of a transaction
 * via the custom `xandeumResultSubscribe` method.
 *
 * This is useful for receiving asynchronous results tied to an on-chain operation,
 * such as file creation, modification, or deletion.
 *
 * The subscription sends a JSON-RPC request with:
 * - `method`: "xandeumResultSubscribe"
 * - `params`: [txId, { commitment: "finalized" }]
 *
 * The WebSocket listens for result messages and invokes the `onResult` callback
 * if a valid result with `fsid`, `status`, or `data` is received.
 *
 * @param tx - The transaction ID you want to listen for results from.
 * @param connection - The solana web3 connection with Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).
 * @param onResult - Callback to handle incoming result messages. Triggered when a valid response is received.
 * @param onError - (Optional) Callback triggered if a WebSocket error occurs.
 * @param onClose - (Optional) Callback triggered when the WebSocket connection closes.
 */

export function subscribeResult (
  connection: Connection,
  tx: string,
  onResult: (value: ResultValue) => void,
  onError?: (err: any) => void,
  onClose?: () => void
): void {
  let rpcEndpoint = connection.rpcEndpoint;
  const url = new URL(rpcEndpoint);
  url.port = '8900'; // Set the port to 8900
  url.protocol = url.protocol.replace('http', 'ws'); 
  const wsEndpoint = url.toString();
  const ws = new WebSocket(wsEndpoint);

  ws.addEventListener('open', () => {
    const subscriptionMessage = {
      jsonrpc: '2.0',
      id: 1,
      method: 'xandeumResultSubscribe',
      params: [tx, { commitment: 'finalized' }]
    }
    ws.send(JSON.stringify(subscriptionMessage))
  })

  ws.addEventListener('message', event => {
    const d = JSON.parse(String(event.data).replace(/:\s*(\d{16,})/g, ': "$1"'))

    const value = d?.params?.result?.value
    if (
      (value?.fsid || value?.status || value?.data) &&
      d?.params?.subscription
    ) {
      onResult({
        fsid: value.fsid,
        status: value.status,
        data: value.message,
        subscription: d.params.subscription
      })
    }
  })

  ws.addEventListener('error', error => {
    if (onError) onError(error)
  })

  ws.addEventListener('close', () => {
    if (onClose) onClose()
  })
}

/**
 * Sends a WebSocket JSON-RPC message to unsubscribe from a previously subscribed transaction result
 * using the `xandeumResultUnsubscribed` method (note: custom method, ensure server-side implementation matches).
 *
 * This function automatically closes the WebSocket connection after sending the unsubscribe request.
 * 
 * @param connection - The solana web3 connection with Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).
 * @param subscriptionId - The ID of the active subscription you want to cancel.
 */

export function unsubscribeResult(connection: Connection,subscriptionId: string): void {
  let rpcEndpoint = connection.rpcEndpoint;
  const url = new URL(rpcEndpoint);
  url.port = '8900'; // Set the port to 8900
  url.protocol = url.protocol.replace('http', 'ws'); 
  const wsEndpoint = url.toString();
  const ws = new WebSocket(wsEndpoint);

  ws.addEventListener('open', () => {
    const unsubscribeMessage = {
      jsonrpc: '2.0',
      id: 2,
      method: 'xandeumResultUnsubscribe',
      params: [subscriptionId]
    }

    ws.send(JSON.stringify(unsubscribeMessage))
    console.log(
      `Sent xandeumResultUnsubscribe for subscription ID: ${subscriptionId}`
    )
    ws.close()
  })

  ws.addEventListener('error', err => {
    console.error('WebSocket error during unsubscribe:', err)
  })
}
