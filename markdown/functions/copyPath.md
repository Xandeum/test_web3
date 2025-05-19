[**Xandeum Web3 Library v9.0.0**](../README.md)

***

[Xandeum Web3 Library](../globals.md) / copyPath

# Function: copyPath()

> **copyPath**(`fsid`, `srcPath`, `destPath`, `wallet`): `Promise`\<`Transaction`\>

Defined in: [copyPath.ts:23](https://github.com/Xandeum/test_web3/blob/main/src/copyPath.ts#L23)

Constructs a Solana transaction to copy a file or directory from one  path to another.

The payload includes:
- Opcode `9` (1 byte)
- Filesystem ID (`fsid`) encoded as 8 bytes little-endian
- UTF-8 encoded `srcPath\0destPath`

## Parameters

### fsid

`string`

The unique numeric identifier representing the target file system.

### srcPath

`string`

The source path to copy from (e.g., `/documents/report.txt`).

### destPath

`string`

The destination path to copy to (e.g., `/archive/report.txt`).

### wallet

`PublicKey`

The wallet public key used to sign and authorize the transaction.

## Returns

`Promise`\<`Transaction`\>

A Promise that resolves to a Solana `Transaction` object containing the copyPath instruction.

## Throws

Will throw an error if `srcPath` or `destPath` contains invalid characters.
