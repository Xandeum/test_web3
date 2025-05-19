export interface RpcRequest {
  jsonrpc: string
  id: number
  method: string
  params: any[]
}

/**
 * Sends a JSON-RPC request to the Xandeum RPC endpoint to list all entries (files and subdirectories)
 * within a specified path.
 *
 * This function calls the custom RPC method `listDirs`, which is  return an array of
 * directory entry metadata — names, types etc.
 *
 * @param path - The  filesystem path representing the directory to list (e.g., `/documents`).
 * @param url - The full URL of the Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).
 *
 * @returns A `Promise<any>` resolving to the parsed JSON response from the RPC server,
 *          typically including a `result` array containing directory entry objects.
 */

export async function listDirectoryEntry (
  path: string,
  url: string
): Promise<any> {
  const requestBody: RpcRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'listDirs',
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
