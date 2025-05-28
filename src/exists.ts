import { Connection } from "@solana/web3.js"

export interface RpcRequest {
  jsonrpc: string
  id: number
  method: string
  params: any[]
}

/**
 * Sends a JSON-RPC request to the Xandeum RPC endpoint to check if a file or directory exists.
 *
 * This function calls the custom RPC method `isExist`, which should be implemented
 * by the backend to validate the existence of metadata (files/directories) at a given path.
 * @param connection - The solana web3 connection with Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).
 * @param path - The filesystem path to check (e.g., `/documents/myfile.txt`).
 *
 * @returns A `Promise<any>` resolving to the RPC response JSON, typically including a `result` field
 *          indicating existence (e.g., `true` or `false`), or `null` if not found.
 *
 */

  export async function exists (connection: Connection,path: string): Promise<any> {
  const url = connection.rpcEndpoint;
  const requestBody: RpcRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'isExist',
    params: [path]
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data = await response.json()
  return data
}
