import { getBalance } from '../src/balance'
import { explorer, isValidAddress } from '@alephium/web3'

jest.mock('@alephium/web3');
    
test('get balance for invalid account throws error', async () => {
    expect(getBalance("invalid")).rejects.toThrow("Invalid address")
})

test('get balance for empty string throws error', async () => {    
    expect(getBalance("")).rejects.toThrow("Invalid address")
})

test('get balance for valid account returns balance', async () => {
    const resp = {
        "balance": "999",
        "lockedBalance": 0
    }
    jest.mocked(isValidAddress).mockReturnValue(true)
    jest.mocked(explorer.Api).mockImplementation(() => {
        return {           
            addresses: {
                getAddressesAddressBalance: jest.fn()
                .mockResolvedValueOnce({
                    "balance": "999",
                    "lockedBalance": 0
                })
            },
            ...jest.requireActual('@alephium/web3').explorer.Api            
        }
    })
    expect(await getBalance("1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH")).toMatchObject(resp)
})

test('get balance throws error if there is any issues with calling the explorer api', async () => {
    jest.mocked(isValidAddress).mockReturnValue(true)
    jest.mocked(explorer.Api).mockImplementation(() => {
        return {           
            addresses: {
                getAddressesAddressBalance: jest.fn()
                .mockRejectedValueOnce(new Error("Network Error"))
            },
            ...jest.requireActual('@alephium/web3').explorer.Api            
        }
    })
    
    expect(getBalance("1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH"))
        .rejects.toThrow("Error getting balance")
})

test('get balance throws error if there is any issues with calling the explorer api', async () => {
    jest.mocked(isValidAddress).mockReturnValue(true)
    jest.mocked(explorer.Api).mockImplementation(() => {
        return {           
            addresses: {
                getAddressesAddressBalance: jest.fn()
                .mockRejectedValueOnce(new Error("Network Error"))
            },
            baseUrl: "https://backend.testnet.alephium.org",
            ...jest.requireActual('@alephium/web3').explorer.Api            
        }
    })
    
    console.log(new explorer.Api().baseUrl)
})