import { isValidAddress, explorer } from "@alephium/web3";


export async function getBalance(address: string) {
    if (!isValidAddress(address)) {
        throw new Error("Invalid address")
    }
    try {        
        const api = new explorer.Api({
            baseUrl: process.env.BASE_URL || "https://backend.testnet.alephium.org"
        });
        const balance = await api.addresses.getAddressesAddressBalance(address);    
        return balance;
    } catch (error) {
        throw new Error("Error getting balance")
    }    
}   

