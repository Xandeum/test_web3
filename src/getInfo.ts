// const url = 'https://api.devnet.solana.com';

export interface RpcRequest {
    jsonrpc: string;
    id: number;
    method: string;
    params: any[];
  }
  
  /**
   * Calls Solana RPC method `getMetadata` for the file and direcories with the given path. (parent_path, depth,type)
   * @param path The metadata path (e.g., account or key)
   * @param url The Xandeum RPC URL
   */
  export async function getInfo(path: string,url:string): Promise<any> {
    const requestBody: RpcRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'getInfo',
      params: [path],
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  }
  