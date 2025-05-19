import { Transaction, TransactionInstruction, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { programId } from './const'
import { sanitizePath } from './sanitizePath'

/**
 * Constructs a Solana transaction to remove a file from a  file system,
 * identified by a file system ID (`fsid`) and a UTF-8 encoded file path.
 *
 * This transaction includes:
 * - A discriminator byte `5` to identify the "remove file" instruction.
 * - The `fsid` encoded as a 64-bit little-endian unsigned integer.
 * - The file path to be removed, encoded as UTF-8 bytes.
 *
 * @param fsid - A stringified integer representing the file system ID in which the file resides.
 * @param path - The full path to the file to be deleted.
 * @param wallet - The public key of the wallet that signs and authorizes the transaction.
 * @returns A Promise that resolves to a Solana `Transaction` object containing the remove file instruction.
 * @throws May throw an error if `path` is invalid per `sanitizePath`.
 */

export async function removeFile (
  fsid: string,
  path: string,
  wallet: PublicKey
): Promise<Transaction> {
  sanitizePath(path)

  const instructionData = Buffer.concat([
    Buffer.from(Int8Array.from([5]).buffer),
    Buffer.from(Uint8Array.of(...new BN(fsid).toArray('le', 8))),
    Buffer.from(`${path}`, 'utf-8')
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
