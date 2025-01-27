const MIN_PLAYERS = 3;
const MAX_PLAYERS = 6;

let elements;
document.addEventListener("DOMContentLoaded", () => {
  elements = {
    player_list: document.getElementById("player-list"),
    add_player_button: document.getElementById("player-add"),
    continue_button: document.getElementById("continue-button")
  }
});

let current_round = 0;

function add_player() {
  let player_count = elements.player_list.children.length;
  let player = document.createElement("button");
  player.classList.add("player-button");
  player.onclick = () => player_pressed(player_count);

  let input = document.createElement("input");
  input.type = "text";
  input.classList.add("hidden-input");
  let done_typing = () => {
    player.textContent = input.value;
    input.remove();
  };
  input.addEventListener("blur", done_typing);
  input.addEventListener("keydown", (e) => {
    if (e.key == 'Enter')
      done_typing();
  });
  player.appendChild(input);

  if (player_count >= MIN_PLAYERS) {
    elements.continue_button.style.opacity = 1;
  }
  if (player_count >= MAX_PLAYERS) {
    player.classList.add("last-player");
    elements.player_list.replaceChild(player, elements.add_player_button);
  } else {
    elements.player_list.insertBefore(player, elements.add_player_button);
  }

  input.focus();
}
function player_pressed(player) {
  console.log(`player ${player} clicked`);
}

function continue_pressed() {
  if(current_round == 0) {
    elements.continue_button.textContent = "Weiter";
    elements.add_player_button.classList.add("hide-button");
  }
}
