import quotes from './quotes.json';

function random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const lastday = () => {
    console.log(random(quotes).body);
};
