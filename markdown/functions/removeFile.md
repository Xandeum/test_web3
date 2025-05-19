[**Xandeum Web3 Library v9.0.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / removeFile

# Function: removeFile()

> **removeFile**(`fsid`, `path`, `wallet`): `Promise`\<`Transaction`\>

Defined in: [removeFile.ts:22](https://github.com/Xandeum/test_web3/blob/main/src/removeFile.ts#L22)

Constructs a Solana transaction to remove a file from a  file system,
identified by a file system ID (`fsid`) and a UTF-8 encoded file path.

This transaction includes:
- A discriminator byte `5` to identify the "remove file" instruction.
- The `fsid` encoded as a 64-bit little-endian unsigned integer.
- The file path to be removed, encoded as UTF-8 bytes.

## Parameters

### fsid

`string`

A stringified integer representing the file system ID in which the file resides.

### path

`string`

The full path to the file to be deleted.

### wallet

`PublicKey`

The public key of the wallet that signs and authorizes the transaction.

## Returns

`Promise`\<`Transaction`\>

A Promise that resolves to a Solana `Transaction` object containing the remove file instruction.

## Throws

May throw an error if `path` is invalid per `sanitizePath`.
