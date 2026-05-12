import { registerGameScene } from "./scenes/game.js";
import { registerGameOverScene } from "./scenes/gameover.js";

kaboom({
    width: 400,
    height: 600,
    letterbox: true,
    background: [135, 206, 235],
});

registerGameScene();
registerGameOverScene();

go("game");
