
const MEME_COUNT = 4;

export const memeService = {
    getRandomMeme
}

const MEMES = Array.from({ length: MEME_COUNT }, (_, i) => ({
    id: `static:meme${i + 1}`,
    url: `/memes/meme${i + 1}.jpg`,
}));

function getRandomMeme() {
    const idx = Math.floor(Math.random() * MEMES.length);
    return MEMES[idx];
}

