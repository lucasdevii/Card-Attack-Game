export const shuffleCheap = (cheap) => {
    for (let i = cheap.length - 1; i > 0; i--) {
        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );

        [cheap[i], cheap[randomIndex]] = [cheap[randomIndex], cheap[i]];

    }
    return cheap;

}