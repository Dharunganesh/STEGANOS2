const text="Silence becomes the loudest language here. Every flicker of a hand, every frantic gesture, every nervous laugh is a clue. Can your team unravel the puzzle when words are forbidden? Step into a world where only instincts, imagination, and pure chemistry can save you. Lights on. Time ticking. Guess right — or fade out.Silence becomes power.Gestures speak louder than words as your team reads, acts, and deciphers under the ticking clock. Expression is your only weapon."
let index=0

function func(){
    if(index < text.length){
        document.getElementById("p").innerHTML += text.charAt(index)
        index++
        setTimeout(func,0.3)
    }
}
func()


window.onload=typeEffect
