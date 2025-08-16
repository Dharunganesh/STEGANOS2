const text="A body lies cold. The room reeks of secrets. Every clue you miss brings the killer closer to freedom. Dive into a twisted tale of lies, alibis, and hidden motives. Search the scene, interrogate the suspects, and stitch the truth together before time runs out. The murderer is among you… will you unmask them?The crime scene tells the story.Clues hide in plain sight, suspects weave their lies, and only sharp deduction unmasks the truth. Justice waits for no one."
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
