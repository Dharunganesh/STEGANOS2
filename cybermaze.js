const text="Step into the maze where logic is your only compass.Every cell holds a challenge, every move tests your mind.Crack the puzzles to unlock your path and push forward.Speed and accuracy are the keys to conquering this labyrinth.Welcome to CodeMaze — where sharp minds find the fastest way out."
let i=0

function typewriter(){
        if(i<text.length){
            document.getElementById("typewriter").innerHTML += text[i]
            i++
            setTimeout(typewriter,0.3)
    }
}

typewriter()