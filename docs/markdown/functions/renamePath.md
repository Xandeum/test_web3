[**Xandeum Web3 Library v9.0.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / renamePath

# Function: renamePath()

> **renamePath**(`fsid`, `oldPath`, `newPath`, `wallet`): `Promise`\<`Transaction`\>

Defined in: [renamePath.ts:23](https://github.com/Xandeum/test_web3/blob/main/src/renamePath.ts#L23)

Constructs a Solana transaction to rename (or move) a file or directory
within a file system, based on a provided file system ID (`fsid`).

This transaction includes:
- A discriminator byte `8` to identify the "rename path" instruction.
- The `fsid` encoded as a 64-bit little-endian unsigned integer.
- The old and new paths, UTF-8 encoded and separated by a null byte (`\0`).

## Parameters

### fsid

`string`

A stringified integer representing the file system ID where the path exists.

### oldPath

`string`

The current path of the file or directory to be renamed or moved.

### newPath

`string`

The new desired path for the target.

### wallet

`PublicKey`

The public key of the wallet that signs and authorizes the transaction.

## Returns

`Promise`\<`Transaction`\>

A Promise that resolves to a Solana `Transaction` object containing the rename path instruction.

## Throws

May throw an error if either `oldPath` or `newPath` is invalid per `sanitizePath`.
