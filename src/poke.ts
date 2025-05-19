import { Transaction, TransactionInstruction, PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { programId } from './const'
import { sanitizePath } from './sanitizePath'

/**
 * Constructs a Solana transaction to perform a poke\operation, which writes data
 * to a file at the specified path and byte position.
 *
 * This transaction includes:
 * - A discriminator byte `4` to identify the poke instruction.
 * - The `fsid` encoded as a 64-bit little-endian unsigned integer.
 * - The byte offset where data should be written.
 * - The UTF-8 encoded file path.
 * - Two accounts: the signer/writable wallet and a read-only data account (`dataKey`) holding the data to be written.
 *
 * @param fsid - A stringified integer representing the file system ID where the file resides.
 * @param path - The path to the file to be written to.
 * @param position - The byte offset in the file where data should be written.
 * @param wallet - The public key of the wallet that signs and authorizes the transaction.
 * @param dataKey - A public key of a data account that holds the content to be written to the file.
 * @returns A Promise that resolves to a Solana `Transaction` object containing the poke instruction.
 * @throws Will throw an error if the `path` contains invalid characters.
 */

export async function poke (
  fsid: string,
  path: string,
  position: number,
  wallet: PublicKey,
  dataKey: PublicKey
): Promise<Transaction> {
  sanitizePath(path)

  const rest = Buffer.from(`${path}`, 'utf-8')
  const instructionData = Buffer.concat([
    Buffer.from(Int8Array.from([4]).buffer),
    Buffer.from(Uint8Array.of(...new BN(fsid).toArray('le', 8))),
    Buffer.from(Uint8Array.of(...new BN(position).toArray('le', 8))),
    rest
  ])

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: wallet,
        isSigner: true,
        isWritable: true
      },
      {
        pubkey: dataKey,
        isSigner: false,
        isWritable: false
      }
    ],
    programId: new PublicKey(programId),
    data: instructionData
  })

  const tx = new Transaction().add(instruction)
  return tx
}
