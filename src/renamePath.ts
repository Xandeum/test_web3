import { Transaction, TransactionInstruction, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { programId } from './const'
import { sanitizePath } from './sanitizePath'

/**
 * Constructs a Solana transaction to rename (or move) a file or directory
 * within a file system, based on a provided file system ID (`fsid`).
 *
 * This transaction includes:
 * - A discriminator byte `8` to identify the "rename path" instruction.
 * - The `fsid` encoded as a 64-bit little-endian unsigned integer.
 * - The old and new paths, UTF-8 encoded and separated by a null byte (`\0`).
 *
 * @param fsid - A stringified integer representing the file system ID where the path exists.
 * @param oldPath - The current path of the file or directory to be renamed or moved.
 * @param newPath - The new desired path for the target.
 * @param wallet - The public key of the wallet that signs and authorizes the transaction.
 * @returns A Promise that resolves to a Solana `Transaction` object containing the rename path instruction.
 * @throws May throw an error if either `oldPath` or `newPath` is invalid per `sanitizePath`.
 */

export async function renamePath (
  fsid: string,
  oldPath: string,
  newPath: string,
  wallet: PublicKey
): Promise<Transaction> {
  sanitizePath(oldPath)

  sanitizePath(newPath)

  const rest = Buffer.from(`${oldPath}\0${newPath}`, 'utf-8')

  const instructionData = Buffer.concat([
    Buffer.from(Int8Array.from([8]).buffer),
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
