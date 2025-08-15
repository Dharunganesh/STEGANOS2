const text="Blind Coding isn’t just about writing code — it’s about coding with your mind’s eye.With your screen hidden, every keystroke is a leap of faith, guided only by logic, memory, and precision.It’s where syntax mastery meets raw problem-solving power.No backspaces, no previews — just you, your brain, and the code you believe in."
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