import data from './data.json';

export let id = document.getElementById.bind(document);
export let idEv = (x: string, y: keyof HTMLElementEventMap, z: any) => id(x)?.addEventListener(y, z);

type SDCard = {
    nev: string,
    meret: number
};

let cards: Array<SDCard> = data.map(x => {
    return {
        nev: x.nev,
        meret: parseInt(x.meret)
    }
});

function normalize(str: string): string {
    return str.toLowerCase();
}

/*
function fsearch(cards: Array<SDCard>, prompt: string): Array<SDCard> {
    let words = prompt.split(' ').map(normalize);

    return cards.filter(x => {
        return words.filter((y: string) => {
            return normalize(y).includes(normalize(x.nev));
        }).length > 0;
    });
}
*/

function search(cards: Array<SDCard>, prompt: string): Array<SDCard> {
    let res = cards.filter(x => normalize(x.nev).includes(normalize(prompt)));
    res.sort((a: SDCard, b: SDCard) => a.meret > b.meret ? -1 : 1);

    return res;
}

document.addEventListener('DOMContentLoaded', () => {
    const out = id('output')!;

    idEv('search', 'input', (ev: Event) => {
        let t = ev.target as HTMLInputElement;
        if (t.value.length < 3) {
            out.innerText = '';
            return;
        };

        let res = search(cards, t.value);
        out.innerText = res.reduce((acc: string, x: SDCard) => `${acc}\n${x.nev} ${x.meret}`, '');
    });
});
