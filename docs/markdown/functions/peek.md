[**Xandeum Web3 Library v9.0.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / peek

# Function: peek()

> **peek**(`fsid`, `path`, `startPosition`, `endPosition`, `wallet`): `Promise`\<`Transaction`\>

Defined in: [peek.ts:27](https://github.com/Xandeum/test_web3/blob/main/src/peek.ts#L27)

Constructs a Solana transaction to perform a "peek" operation on a file within a file system.

The peek operation reads data between two byte offsets within a specified file path.

This transaction includes:
- A discriminator byte `3` to identify the "peek" instruction.
- The `fsid` encoded as a 64-bit little-endian unsigned integer.
- The start and end positions (both 64-bit little-endian integers) representing the byte range to read.
- The file path as a UTF-8 encoded buffer.
- The wallet public key as a writable and signing account.

## Parameters

### fsid

`string`

A stringified integer representing the file system ID in which the file resides.

### path

`string`

The path to the file to be peeked.

### startPosition

`number`

The starting byte offset (inclusive) to begin reading from.

### endPosition

`number`

The ending byte offset (exclusive) to stop reading at.

### wallet

`PublicKey`

The public key of the wallet that will sign and authorize the transaction.

## Returns

`Promise`\<`Transaction`\>

A Promise that resolves to a Solana `Transaction` object containing the peek instruction.

## Throws

Will throw an error if the `path` contains invalid characters.
