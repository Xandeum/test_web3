[**Xandeum Web3 Library v9.2.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / getMetadata

# Function: getMetadata()

> **getMetadata**(`path`, `url`): `Promise`\<`any`\>

Defined in: [getMetadata.ts:24](https://github.com/Xandeum/test_web3/blob/main/src/getMetadata.ts#L24)

Sends a JSON-RPC request to the Xandeum RPC endpoint to retrieve metadata
about a file or directory at the given path.

This function calls the custom RPC method `getMetadata`, which is implemented
by the backend to return metadata such as type (file or directory), size,
timestamps etc.

## Parameters

### path

`string`

The filesystem path to query metadata for (e.g., `/documents/myfile.txt`).

### url

`string`

The full URL of the Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).

## Returns

`Promise`\<`any`\>

A `Promise<any>` resolving to the parsed JSON response from the RPC server,
         typically containing a `result` object with metadata fields.
