// import { TransactionInstruction, Transaction } from "@solana/web3.js";


// /**
//  * Creates a transaction with a single instruction.
//  * @param {PublicKey} programId - The Solana program ID to target.
//  * @param {Keypair} wallet - The wallet Keypair for the transaction signer.
//  * @returns {Transaction} - The constructed transaction.
//  */
// export async function bigbang(programId) {
//     const instructionData = Buffer.concat([
//       Buffer.from(Int8Array.from([0]).buffer), // instruction tag
//     ]);
  
//     const instruction = new TransactionInstruction({
//       keys: [
//         {
//           pubkey: wallet.publicKey,
//           isSigner: true,
//           isWritable: true,
//         },
//       ],
//       programId,
//       data: instructionData,
//     });
  
//     const tx = new Transaction().add(instruction);
//     return tx
// }
export { bigbang } from "./bigbang";
export * from './webSocket';