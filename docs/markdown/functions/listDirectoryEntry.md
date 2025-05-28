[**Xandeum Web3 Library v9.3.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / listDirectoryEntry

# Function: listDirectoryEntry()

> **listDirectoryEntry**(`path`, `url`): `Promise`\<`any`\>

Defined in: [listDirectoryEntery.ts:22](https://github.com/Xandeum/test_web3/blob/main/src/listDirectoryEntery.ts#L22)

Sends a JSON-RPC request to the Xandeum RPC endpoint to list all entries (files and subdirectories)
within a specified path.

This function calls the custom RPC method `listDirs`, which is  return an array of
directory entry metadata — names, types etc.

## Parameters

### path

`string`

The  filesystem path representing the directory to list (e.g., `/documents`).

### url

`string`

The full URL of the Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).

## Returns

`Promise`\<`any`\>

A `Promise<any>` resolving to the parsed JSON response from the RPC server,
         typically including a `result` array containing directory entry objects.
