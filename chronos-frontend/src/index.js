document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const h1 = document.getElementById("test")
        h1.style.color = "green"
        const p = document.createElement("p")
        p.innerText = "Javascript is awesome!"
        h1.after(p)
    }, 3000)
})