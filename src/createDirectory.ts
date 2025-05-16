

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
   * @param path - The path where you want to create directory.
   * @param name - The name of the directory.
   * @param wallet - The wallet that signs the transaction.
   * @returns A Solana Transaction object.
   */
  export async function createDirectory(
    programId: PublicKey,
    fsid: string,
    path: string,
    name: string,
    wallet: PublicKey
  ): Promise<Transaction> {
    // Validate path: only letters, numbers, and /
    if (!/^[a-zA-Z0-9/]*$/.test(path)) {
      throw new Error("Invalid path: Only letters, numbers, and '/' are allowed.");
    }
  
    // Validate name: only letters and numbers //TODO update this to allow special characters
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      throw new Error("Invalid name: Only letters and numbers are allowed.");
    }
    const rest = Buffer.from(`${path}\0${name}`, "utf-8");
    const instructionData = Buffer.concat([
      Buffer.from(Int8Array.from([6]).buffer),
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
  
  