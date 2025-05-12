

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
   * @param path - The file path where you want to poke.
   * @param startPositionposition - The start position in the file where you want to peek.
   * @endPosition - The end position in the file where you want to peek.
   * @param wallet - The wallet that signs the transaction.
   * @returns A Solana Transaction object.
   */
  export async function peek(
    programId: PublicKey,
    fsid: string,
    path: string,
    startPosition: number,
    endPosition: number,
    wallet: PublicKey,
  ): Promise<Transaction> {
    // Validate path: only letters, numbers, and /
    if (!/^[a-zA-Z0-9/]*$/.test(path)) {
      throw new Error("Invalid path: Only letters, numbers, and '/' are allowed.");
    }
  
    const rest = Buffer.from(`${path}`, "utf-8");
    const instructionData = Buffer.concat([
      Buffer.from(Int8Array.from([3]).buffer),
      Buffer.from(Uint8Array.of(...new BN(fsid).toArray("le", 8))),
      Buffer.from(Uint8Array.of(...new BN(startPosition).toArray("le", 8))),
      Buffer.from(Uint8Array.of(...new BN(endPosition).toArray("le", 8))),
      rest,
    ]);
  
    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: wallet,
          isSigner: true,
          isWritable: true,
        }
      ],
      programId,
      data: instructionData,
    });
  
    const tx = new Transaction().add(instruction);
    return tx;
  }
  
  