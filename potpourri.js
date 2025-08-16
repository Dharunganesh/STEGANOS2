const text="In the chaos of riddles, reflex, and razor-sharp memory, only the quickest minds and steadiest hands will survive. Potpourri isn’t just a game — it’s a gauntlet of twists. From decoding hidden connections to flipping fate itself, every second drags you closer to victory… or collapse. Can your team outthink, outflip, and outstack the rest?Every second is a twist.Crack the connections, flip with precision, and stack with speed. Potpourri fuses brainpower, reflex, and memory into one relentless challenge."
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
