const text="Where bold ideas meet brilliant minds, innovation takes center stage.This is the arena for thinkers, dreamers, and problem-solvers to shine.Every paper here is not just research — it’s a revolution in words.With skill, insight, and vision, presenters turn knowledge into impact.Welcome to Paper Presentation — where your innovation speaks to the world."
let i=0
function func(){
    if(i<text.length){
        document.getElementById("p").innerHTML += text[i]
        i++
        setTimeout(func,0.1)
    }
}

func()