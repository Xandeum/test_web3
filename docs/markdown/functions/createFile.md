[**Xandeum Web3 Library v9.0.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / createFile

# Function: createFile()

> **createFile**(`fsid`, `path`, `name`, `wallet`): `Promise`\<`Transaction`\>

Defined in: [createFile.ts:23](https://github.com/Xandeum/test_web3/blob/main/src/createFile.ts#L23)

Constructs a Solana transaction to create a new file
within a file system, identified by a file system ID (`fsid`).

This transaction includes:
- A discriminator byte `2` to identify the "create file" operation.
- The `fsid` encoded as a 64-bit little-endian unsigned integer.
- A UTF-8 encoded payload combining the `path` and `name`, separated by a null terminator.
- The wallet public key as a signer and writable account.

## Parameters

### fsid

`string`

A stringified integer representing the file system ID where the file is to be created.

### path

`string`

The absolute or relative path within the file system where the file should be created.

### name

`string`

The name of the new file or directory to be created.

### wallet

`PublicKey`

The public key of the wallet that will sign and authorize the transaction.

## Returns

`Promise`\<`Transaction`\>

A Promise that resolves to a Solana `Transaction` object containing the createFile instruction.

## Throws

Will throw an error if `path` or `name` contains invalid characters.
