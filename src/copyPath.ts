

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
   * @param srcPath - Source path.
   * @param destPath - Destination path.
   * @param wallet - The wallet that signs the transaction.
   * @returns A Solana Transaction object.
   */
  export async function copyPath(
    programId: PublicKey,
    fsid: string,
    srcPath: string,
    destPath: string,
    wallet: PublicKey
  ): Promise<Transaction> {
    // Validate path: only letters, numbers, and /
    if (!/^[a-zA-Z0-9/]*$/.test(srcPath)) {
      throw new Error("Invalid srcPath: Only letters, numbers, and '/' are allowed.");
    }
    if (!/^[a-zA-Z0-9/]*$/.test(destPath)) {
        throw new Error("Invalid destPath: Only letters, numbers, and '/' are allowed.");
    }
      
    const rest = Buffer.from(`${srcPath}\0${destPath}`, "utf-8");
  
    const instructionData = Buffer.concat([
      Buffer.from(Int8Array.from([9]).buffer),
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
  
  