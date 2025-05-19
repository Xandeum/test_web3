

import {
    Transaction,
    TransactionInstruction,
    PublicKey,
  } from "@solana/web3.js";
import BN from "bn.js";
import { programId } from "./const.js";
  

  /**
   * Creates a Solana transaction with a basic instruction.
   * @param programId - The program's public key.
   * @param fsid - The fsid that will armageddon.
   * @param wallet - The wallet that signs the transaction.
   * @returns A Solana Transaction object.
   */
  export async function armageddon(fsid:string,wallet: PublicKey): Promise<Transaction> {
    const instructionData = Buffer.concat([
      Buffer.from(Int8Array.from([1]).buffer),
      Buffer.from(Uint8Array.of(...new BN(fsid).toArray("le", 8))),

    ]);
  
    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: wallet,
          isSigner: true,
          isWritable: true,
        },
      ],
      programId:new PublicKey(programId),
      data: instructionData,
    });
  
    const tx = new Transaction().add(instruction);
    return tx;
  }
  