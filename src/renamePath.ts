

import {
    Transaction,
    TransactionInstruction,
    PublicKey,
  } from "@solana/web3.js";
import BN from "bn.js";
  
  /**
   * Creates a Solana transaction with a basic instruction.
   * @param programId - The program's public key.
   * @param fsid - The fsid that will armageddon.
   * @param oldPath - The path you want to copy.
   * @param newPath - The new path.
   * @param wallet - The wallet that signs the transaction.
   * @returns A Solana Transaction object.
   */
  export async function renamePath(
    programId: PublicKey,
    fsid: string,
    oldPath: string,
    newPath: string,
    wallet: PublicKey
  ): Promise<Transaction> {
    // Validate path: only letters, numbers, and /
    if (!/^[a-zA-Z0-9/]*$/.test(oldPath)) {
      throw new Error("Invalid oldPath: Only letters, numbers, and '/' are allowed.");
    }
    if (!/^[a-zA-Z0-9/]*$/.test(newPath)) {
        throw new Error("Invalid newPath: Only letters, numbers, and '/' are allowed.");
    }
      
    const rest = Buffer.from(`${oldPath}\0${newPath}`, "utf-8");
  
    const instructionData = Buffer.concat([
      Buffer.from(Int8Array.from([8]).buffer),
      Buffer.from(Uint8Array.of(...new BN(fsid).toArray("le", 8))),
      rest,
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
  
  