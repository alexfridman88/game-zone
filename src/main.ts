import {GameComponent} from "./game/game.component";
import {InputHandler} from "./game/service/input-handler";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game') as HTMLCanvasElement;
    const inputHandler = new InputHandler(); // Create an instance of InputHandler

    function gameLoop(): void {
        new GameComponent(canvas, inputHandler); // Initialize the game component and start the game loop
    }

    gameLoop();
});
