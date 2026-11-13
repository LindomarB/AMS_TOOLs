function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 50;
    const light = 30;

    return `hsl(${hue}, ${saturation}%, ${light}%)`;
}

export default randomColor;