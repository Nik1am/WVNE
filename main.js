var d_chars = document.getElementById("d_chars")
var charname = document.getElementById("name")
var text = document.getElementById("text")
var charactersWrapper = document.getElementById("characters-wrapper")

//ASSETS SECTION
characters = {
    prob: {
        name: "ProBlematic",
        current: "main",
        elem: sprite_simple(),
        sprites: {
            "main": "./assets/steve0001.png",
            "angry": "./assets/steve0002.png",
            "think": "./assets/steve0003.png"
        },
        pos: {
            x:0,
            y:0
        },
        scale: 1
    }
}
//END OF ASSETS SECTION

// STORY SECTION 
//branch
//  screen
//    characters
//    text

story = {
    "b_test": [
        {//0
            chars: [characters.prob],
            author: characters.prob,
            text: "Да",
            edits: [
                {
                    type: "edit_char",
                    char: characters.prob,
                    sprite: "main",
                    pos: {
                        x:0,
                        y:0
                    }
                }
            ]
        },
        {//1
            chars: [characters.prob],
            author: characters.prob,
            text: "ПИЗДА",
            edits: [
                {
                    type: "edit_char",
                    char: characters.prob,
                    sprite: "angry",
                    pos: {
                        x:0.5,
                        y:-10
                    },
                    scale: 2
                }
            ]
        },
        {//2
            chars: [characters.prob],
            author: characters.prob,
            text: "ампылда",
            edits: [
                {
                    type: "edit_char",
                    char: characters.prob,
                    sprite: "think",
                    pos: {
                        x:1,
                        y:0
                    },
                    scale: 1
                }
            ]
        }
    ]
}
// END OF STORY SECTION



current_branch = "b_test"
current_screen = 0

function sprite_simple(){
    img_elem = document.createElement("img")
    img_elem.id = "character-sprite"
    return img_elem
}

function render(branch,screen){
    sc = story[branch][screen]
    charname.innerText = sc.author.name
    text.innerText = sc.text
    screen_chars = sc.chars
    for(e=0;e<sc.edits.length;e++){
        if(sc.edits[e].type == "edit_char"){
            if(sc.edits[e].pos != undefined){
                sc.edits[e].char.pos = sc.edits[e].pos
            }
            if(sc.edits[e].sprite != undefined){
                sc.edits[e].char.current = sc.edits[e].sprite
                sc.edits[e].char.elem.src = sc.edits[e].char.sprites[sc.edits[e].char.current]
            }
            if(sc.edits[e].scale != undefined){
                sc.edits[e].char.scale = sc.edits[e].scale
            }
        }
    }
    for(char=0;char<screen_chars.length;char++){
        char_sprite_image = screen_chars[char].elem
        charactersWrapper.appendChild(char_sprite_image)
        x = screen_chars[char].pos.x
        y = screen_chars[char].pos.y
        scale = screen_chars[char].scale
        char_sprite_image.onload = () => {
            char_sprite_image.style.left = (x * charactersWrapper.clientWidth) - (x * char_sprite_image.clientWidth)
            char_sprite_image.style.bottom = (y * charactersWrapper.clientHeight) - (y * char_sprite_image.clientHeight)
            char_sprite_image.style.scale = scale
        }
    }
    
}

function change_screen() {
    if (current_screen+1 != Object.keys(story[current_branch]).length ){
        current_screen++
    }
    else {
        current_screen = 0
    }
    render(current_branch,current_screen)
}

window.onload = () => {
    render(current_branch,current_screen)
}

window.onclick = () => {
    change_screen()
}