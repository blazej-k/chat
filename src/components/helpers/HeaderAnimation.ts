const createHeaderAnimation = (current: HTMLHeadingElement, colors: string[]) => {
    const text = current.textContent?.split("") || []
    current.textContent = ''
    let i = 0
    text.forEach((element) => {
        current.innerHTML += `<span>${element}</span>`
    });
    const timer = setInterval(() => {
        current.children[i].classList.add('fade-text', i > 3 ? colors[0] : colors[1])
        if (i === text.length - 1) {
            clearInterval(timer)
        }
        i++
    }, 60)
}

export default createHeaderAnimation