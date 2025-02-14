const DISPLAYED_TEXT = {
  CONTINUE_BUTTON: {
    START_GAME: () => "Spiel starten",
    START_ROUND: (round: number) => `Runde ${round} starten`,
    END_ROUND: () => "Runde beenden",
    RESTART_GAME: () => "Neues Spiel",
  },
};


type EventHandler = ((this: GlobalEventHandlers, ev: MouseEvent) => any);

function create_player_add_button(): HTMLButtonElement {
  let button = document.createElement("button") as HTMLButtonElement;
  button.id = "player-add";
  button.classList.add("player-button");
  button.onclick = add_player;
  button.textContent = "+";

  return button;
}

function create_player_name_input(value_handler: ((value: string) => any)): HTMLInputElement {
  let input = document.createElement("input");
  input.type = "text";
  input.classList.add("hidden-input");
  let done_typing = () => {
    value_handler(input.value);
    input.remove();
  };
  input.addEventListener("blur", done_typing);
  input.addEventListener("keydown", (e) => {
    if (e.key == 'Enter')
      done_typing();
  });

  return input;
}
function create_player(onclick: EventHandler): {player: HTMLElement, input: HTMLInputElement, button: HTMLButtonElement} {
  let player = document.createElement("div");
  player.classList.add("player");

  let coin_stash = document.createElement("div");
  coin_stash.classList.add("coin-stash");
  player.appendChild(coin_stash);

  let player_button = document.createElement("button");
  player_button.classList.add("player-button");
  player_button.onclick = onclick;

  let input = create_player_name_input((value) => player_button.textContent = value);
  player_button.appendChild(input);

  player.appendChild(player_button);

  let point_info = document.createElement("div");
  point_info.classList.add("horizontal");

  let point_text = document.createElement("div");
  point_text.classList.add("point-display");
  point_info.appendChild(point_text);

  player.appendChild(point_info);

  return {player: player, input: input, button: (player_button as HTMLButtonElement)};
}

function create_coin(offsetX: number, offsetY: number, onclick: EventHandler): HTMLElement {
  let coin = document.createElement("div");
  coin.classList.add("coin");
  coin.onclick = onclick;

  coin.style.zIndex = `-${elements.coin_pile.children.length}`;
  set_css_variable(coin, '--x', `${offsetX}vw`);
  set_css_variable(coin, '--y', `${offsetY}vh`);

  return coin;
}
function create_picked_coin(player: number, onclick: EventHandler): HTMLElement {
  let coin_stash = get_player_coin_stash_element(player);
  let coin = create_coin(0, 0, onclick);

  set_css_variable(coin, "--number", coin_stash.children.length);
  set_css_variable(coin, "--picked-by", player);

  let transition_time = get_transition_time();
  coin.style.transition = "0s";
  coin.classList.add("picked");

  setTimeout(() => coin.style.transition = "var(--transitions)", transition_time * 1000);

  return coin;
}
