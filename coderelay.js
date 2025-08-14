const text="Code Relay – where logic runs the race and teamwork takes the win.Each coder passes their code baton, building on every keystroke.Speed meets strategy in this high-pressure coding sprint.One bug can trip you… one smart move can seal victory.Ready to pass, code, and conquer? "
let i=0

function func(){
        if(i<text.length){
            document.getElementById("p").innerHTML += text[i]
            i++
            setTimeout(func,0.3)
    }
}

func()