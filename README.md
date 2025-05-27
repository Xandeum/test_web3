# @xandeum/web3

> Solana transaction builder for interacting with a file system on the Xandeum network.

This package provides a JavaScript/TypeScript interface to construct Solana transactions for creating, modifying, and managing  file systems on-chain using the Xandeum program.

## ✨ Features

- Create and delete file systems (`bigbang`, `armageddon`)
- Manage files and directories (`create`, `rename`, `remove`, `copy`)
- Read and write file contents with byte-level control (`peek`, `poke`)
- Secure path validation and serialization
- Compatible with `@solana/web3.js`

## 📦 Installation

```bash
npm install test2-xandeum-web3
``` 

or

```
yarn add test2-xandeum-web3
```
🚀 Usage

```
import {
  bigbang,
  armageddon,
  createFile,
  poke,
  peek,
  copyPath
} from 'test2-xandeum-web3'

import {
  Connection,
  sendAndConfirmTransaction,
  Keypair
} from '@solana/web3.js'

const connection = new Connection('https://apis.devnet.xandeum.com)
const signer = Keypair.generate()
const wallet = signer.publicKey

async function main() {
  // Create a new file system
  const tx1 = await bigbang(wallet)
  await sendAndConfirmTransaction(connection, tx1, [signer])

  // Create a file
  const tx2 = await createFile('1', '/1','hello.txt', wallet)
  await sendAndConfirmTransaction(connection, tx2, [signer])

  // Write data
  const tx3 = await poke('1', '/1/hello.txt', 0, Buffer.from('Hello Xandeum!'), wallet)
  await sendAndConfirmTransaction(connection, tx3, [signer])

  // Read data
  const tx4 = await peek('1', '/1/hello.txt', 0, 14, wallet)
  await sendAndConfirmTransaction(connection, tx4, [signer])
}
```

## 🧩 API Overview

bigbang(wallet: PublicKey): Promise<Transaction>
Creates a new file system account.

armageddon(fsid: string, wallet: PublicKey): Promise<Transaction>
Deletes a file system by ID.

createFile(fsid: string, path: string, wallet: PublicKey): Promise<Transaction>
Creates a new file at the given path.

poke(fsid: string, path: string, offset: number, data: Buffer, wallet: PublicKey): Promise<Transaction>
Writes bytes to a file starting at a specific offset.

peek(fsid: string, path: string, offset: number, length: number, wallet: PublicKey): Promise<Transaction>
Reads bytes from a file.

copyPath(fsid: string, srcPath: string, destPath: string, wallet: PublicKey): Promise<Transaction>
Copies a file or directory from one path to another.

Other available functions \n
renamePath \n
removeFile \n
removeDirectory \n
createDirectory \n
exists \n
listDirectoryEntry \n
getMetadata \n

All functions that accept a file or directory path will validate inputs using sanitizePath to prevent invalid characters.

## 🌐 WebSocket Subscription

subscribeResult(connection: Connection,tx: string, onResult: (result: ResultValue) => void, onError?: (err: any) => void, onClose?: () => void): void
Subscribes to results from a transaction via WebSocket. Used for listening  events triggered by the transaction.

#### Parameters:

connection - The solana web3 connection with Xandeum-compatible JSON-RPC endpoint (e.g., `'https://api.devnet.solana.com'`).
tx — Transaction signature to subscribe to
onResult(result) — Called when a valid result is received
onError(err) — Optional callback for connection errors
onClose() — Optional callback for connection closure
Example:

```
subscribeResult(
  connection,
  'transactionSignatureHere',
  result => {
    console.log('Result:', result)
  }
)
```

Example
```
import {
  bigbang,
  createFile,
  poke,
  peek,
  subscribeResult
} from '@xandeum/fs-transaction'

import {
  Connection,
  sendAndConfirmTransaction,
  Keypair
} from '@solana/web3.js'

const connection = new Connection('https://api.mainnet-beta.solana.com')
const signer = Keypair.generate()
const wallet = signer.publicKey

async function main() {
  const tx = await createFile('1', '/1/hello.txt', wallet)
  const txSignature = await sendAndConfirmTransaction(connection, tx, [signer])

  subscribeResult(
    connection,
    txSignature,
    result => {
      console.log('Received result:', result)
    },
    err => console.error('WebSocket error:', err),
    () => console.log('WebSocket closed')
  )
}
```

MIT © Xandeum

👤 Author

Built by Xandeum to provide decentralized, programmable file systems on Solana via the Xandeum protocol.


