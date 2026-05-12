export function registerGameOverScene() {
    scene("gameover", (score) => {
        add([
            rect(width(), height()),
            color(0, 0, 0),
            opacity(0.35),
        ]);

        add([
            rect(290, 220, { radius: 16 }),
            pos(center()),
            anchor("center"),
            color(255, 244, 206),
        ]);

        add([
            text("GAME OVER", { size: 30, font: "monospace" }),
            pos(width() / 2, height() / 2 - 62),
            anchor("center"),
            color(90, 64, 32),
        ]);

        add([
            text("SCORE", { size: 16, font: "monospace" }),
            pos(width() / 2, height() / 2 - 8),
            anchor("center"),
            color(122, 92, 44),
        ]);

        add([
            text(String(score), { size: 64, font: "monospace" }),
            pos(width() / 2, height() / 2 + 46),
            anchor("center"),
            color(76, 56, 28),
        ]);

        add([
            text("Press SPACE or TAP", { size: 16, font: "monospace" }),
            pos(width() / 2, height() / 2 + 92),
            anchor("center"),
            color(90, 64, 32),
        ]);

        wait(0.5, () => {
            onKeyPress("space", () => go("game"));
            onMousePress(() => go("game"));
        });
    });
}