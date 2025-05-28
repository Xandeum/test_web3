import { Connection } from "@solana/web3.js"

export interface RpcRequest {
  jsonrpc: string
  id: number
  method: string
  params: any[]
}

/**
 * Sends a JSON-RPC request to the Xandeum RPC endpoint to retrieve metadata
 * about a file or directory at the given path.
 *
 * This function calls the custom RPC method `getMetadata`, which is implemented
 * by the backend to return metadata such as type (file or directory), size,
 * timestamps etc.
 *
 * @param connection - The solana web3 connection with Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).
 * @param path - The filesystem path to query metadata for (e.g., `/documents/myfile.txt`).
 *
 * @returns A `Promise<any>` resolving to the parsed JSON response from the RPC server,
 *          typically containing a `result` object with metadata fields.
 *
 */

export async function getMetadata (connection: Connection,path: string): Promise<any> {
  const url = connection.rpcEndpoint;
  const requestBody: RpcRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'getMetadata',
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
