
import {
  Transaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";

/**
 * Creates a Solana transaction with a basic instruction.
 * @param programId - The program's public key.
 * @param wallet - The wallet that signs the transaction.
 * @returns A Solana Transaction object.
 */
export async function bigbang(programId: PublicKey, wallet: PublicKey): Promise<Transaction> {
  const instructionData = Buffer.concat([
    Buffer.from(Int8Array.from([0]).buffer),
  ]);

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: wallet,
        isSigner: true,
        isWritable: true,
      },
    ],
    programId,
    data: instructionData,
  });

  const tx = new Transaction().add(instruction);
  return tx;
}
