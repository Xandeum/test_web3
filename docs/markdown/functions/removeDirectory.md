[**Xandeum Web3 Library v9.0.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / removeDirectory

# Function: removeDirectory()

> **removeDirectory**(`fsid`, `path`, `wallet`): `Promise`\<`Transaction`\>

Defined in: [removeDirectory.ts:22](https://github.com/Xandeum/test_web3/blob/main/src/removeDirectory.ts#L22)

Constructs a Solana transaction to perform a "remove directory" operation
in a  file system, identified by a file system ID (`fsid`).

This transaction includes:
- A discriminator byte `7` to identify the "remove directory" instruction.
- The `fsid` encoded as a 64-bit little-endian unsigned integer.
- The UTF-8 encoded path of the directory to be removed.

## Parameters

### fsid

`string`

A stringified integer representing the file system ID containing the directory.

### path

`string`

The full path to the directory that should be removed.

### wallet

`PublicKey`

The public key of the wallet that will sign and authorize the transaction.

## Returns

`Promise`\<`Transaction`\>

A Promise that resolves to a Solana `Transaction` object containing the remove directory instruction.

## Throws

May throw an error if the `path` fails validation in `sanitizePath`.
