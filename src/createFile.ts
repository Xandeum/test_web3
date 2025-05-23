import { Transaction, TransactionInstruction, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { programId } from './const'
import { sanitizePath } from './sanitizePath'

/**
 * Constructs a Solana transaction to create a new file
 * within a file system, identified by a file system ID (`fsid`).
 * 
 * @param fsid - A stringified integer representing the file system ID where the file is to be created.
 * @param path - The absolute or relative path within the file system where the file should be created.
 * @param name - The name of the new file or directory to be created.
 * @param wallet - The public key of the wallet that will sign and authorize the transaction.
 * @returns A Promise that resolves to a Solana `Transaction` object containing the createFile instruction.
 * @throws Will throw an error if `path` or `name` contains invalid characters.
 */
export async function createFile (
  fsid: string,
  path: string,
  name: string,
  wallet: PublicKey
): Promise<Transaction> {
  let combinedPath = path + '/' + name
  sanitizePath(combinedPath);

  const rest = Buffer.from(`${path}\0${name}`, 'utf-8')
  const instructionData = Buffer.concat([
    Buffer.from(Int8Array.from([2]).buffer),
    Buffer.from(Uint8Array.of(...new BN(fsid).toArray('le', 8))),
    rest
  ])

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: wallet,
        isSigner: true,
        isWritable: true
      }
    ],
    programId: new PublicKey(programId),
    data: instructionData
  })

  const tx = new Transaction().add(instruction)
  return tx
}
