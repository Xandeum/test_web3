

import {
    Transaction,
    TransactionInstruction,
    PublicKey,
  } from "@solana/web3.js";
import BN from "bn.js";
import { programId } from "./const";
  
  /**
   * Creates a Solana transaction with a basic instruction.
   * @param programId - The program's public key.
   * @param fsid - The fsid that will armageddon.
   * @param path - The file path where you want to poke.
   * @param position - The position in the file where you want to poke.
   * @param wallet - The wallet that signs the transaction.
   * @param dataKeys - The public keys of the data accounts to be used in the poke.
   * @returns A Solana Transaction object.
   */
  export async function poke(
    fsid: string,
    path: string,
    position: number,
    wallet: PublicKey,
    dataKeys: PublicKey[] = []
  ): Promise<Transaction> {
    // Validate path: only letters, numbers, and /
    if (!/^[a-zA-Z0-9/]*$/.test(path)) {
      throw new Error("Invalid path: Only letters, numbers, and '/' are allowed.");
    }
  
    const rest = Buffer.from(`${path}`, "utf-8");
    const instructionData = Buffer.concat([
      Buffer.from(Int8Array.from([4]).buffer),
      Buffer.from(Uint8Array.of(...new BN(fsid).toArray("le", 8))),
      Buffer.from(Uint8Array.of(...new BN(position).toArray("le", 8))),
      rest,
    ]);
  
    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: wallet,
          isSigner: true,
          isWritable: true,
        },
        ...dataKeys.map((pubkey) => ({
            pubkey,
            isSigner: false,
            isWritable: false,
          })),
      ],
      programId:new PublicKey(programId),
      data: instructionData,
    });
  
    const tx = new Transaction().add(instruction);
    return tx;
  }
  
  