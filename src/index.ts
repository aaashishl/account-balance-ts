import { getBalance} from "./balance";

async function main() {
    try {
        const balance = await getBalance("1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH");
        console.log(balance);
    } catch (e) {
        console.error(e);
    }
}

main();
