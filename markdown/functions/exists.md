[**Xandeum Web3 Library v9.3.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / exists

# Function: exists()

> **exists**(`path`, `url`): `Promise`\<`any`\>

Defined in: [exists.ts:22](https://github.com/Xandeum/test_web3/blob/main/src/exists.ts#L22)

Sends a JSON-RPC request to the Xandeum RPC endpoint to check if a file or directory exists.

This function calls the custom RPC method `isExist`, which should be implemented
by the backend to validate the existence of metadata (files/directories) at a given path.

## Parameters

### path

`string`

The filesystem path to check (e.g., `/documents/myfile.txt`).

### url

`string`

The full URL of the Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).

## Returns

`Promise`\<`any`\>

A `Promise<any>` resolving to the RPC response JSON, typically including a `result` field
         indicating existence (e.g., `true` or `false`), or `null` if not found.
