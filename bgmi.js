const text="The battleground awaits. Bullets, strategy, and survival instincts collide in this digital warzone. Squad up, drop in, and fight for dominance — every kill, every placement, every heartbeat counts. Will you crumble under pressure or rise to claim the ultimate chicken dinner? The zone is shrinking… are you ready to conquer it?
The battleground decides the brave.
Shots fired, squads clashing, and strategies unfolding — every move shapes victory. Survival is the only law.
";
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

