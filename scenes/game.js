export function registerGameScene() {
    scene("game", () => {
        const SPEED = 170;
        const JUMP_FORCE = 430;
        const PIPE_GAP = 155;

        setGravity(1450);

        add([
            rect(width(), height()),
            color(131, 214, 255),
            fixed(),
            z(-30),
        ]);

        for (let i = 0; i < 4; i++) {
            const cloud = add([
                rect(88, 34, { radius: 17 }),
                pos(rand(10, width() - 120), rand(40, 230)),
                color(245, 252, 255),
                opacity(0.9),
                move(LEFT, 18),
                z(-20),
            ]);

            cloud.onUpdate(() => {
                if (cloud.pos.x < -120) {
                    cloud.pos = vec2(width() + rand(0, 70), rand(40, 230));
                }
            });
        }

        add([
            rect(width(), 44),
            pos(0, height() - 44),
            color(222, 196, 124),
            fixed(),
            z(-10),
        ]);

        add([
            rect(width(), 8),
            pos(0, height() - 44),
            color(122, 191, 82),
            fixed(),
            z(-9),
        ]);

        add([
            text("SCORE", { size: 18, font: "monospace" }),
            pos(width() / 2, 34),
            anchor("center"),
            color(255, 255, 255),
            fixed(),
            z(20),
        ]);

        let score = 0;
        const scoreLabel = add([
            text("0", { size: 54, font: "monospace" }),
            pos(width() / 2, 74),
            anchor("center"),
            color(255, 255, 255),
            fixed(),
            z(21),
        ]);

        const bird = add([
            circle(12),
            pos(90, height() / 2),
            area(),
            body(),
            color(255, 222, 74),
            outline(2, rgb(230, 188, 36)),
            z(15),
            "player",
        ]);

        const wing = add([
            circle(7),
            pos(bird.pos.x - 6, bird.pos.y + 2),
            color(255, 203, 55),
            z(16),
        ]);

        const eyeWhite = add([
            circle(3.6),
            pos(bird.pos.x + 4, bird.pos.y - 4),
            color(255, 255, 255),
            z(18),
        ]);

        const eyePupil = add([
            circle(1.6),
            pos(bird.pos.x + 5, bird.pos.y - 4),
            color(20, 20, 20),
            z(19),
        ]);

        const beak = add([
            rect(8, 4, { radius: 2 }),
            pos(bird.pos.x + 11, bird.pos.y),
            color(250, 137, 52),
            rotate(-10),
            z(17),
        ]);

        const readyText = add([
            text("TAP / SPACE TO START", { size: 20, font: "monospace" }),
            pos(width() / 2, height() / 2 - 24),
            anchor("center"),
            color(255, 255, 255),
            z(30),
        ]);

        let started = false;

        function spawnPipe() {
            const h = rand(90, height() - PIPE_GAP - 140);
            const x = width() + 20;

            add([
                rect(64, h, { radius: 3 }),
                pos(x, 0),
                color(107, 209, 73),
                outline(2, rgb(56, 158, 45)),
                area(),
                move(LEFT, SPEED),
                offscreen({ destroy: true }),
                "pipe",
            ]);

            add([
                rect(76, 12, { radius: 3 }),
                pos(x - 6, h - 12),
                color(97, 198, 65),
                outline(2, rgb(56, 158, 45)),
                move(LEFT, SPEED),
                offscreen({ destroy: true }),
                z(13),
            ]);

            add([
                rect(64, height() - h - PIPE_GAP - 44, { radius: 3 }),
                pos(x, h + PIPE_GAP),
                color(107, 209, 73),
                outline(2, rgb(56, 158, 45)),
                area(),
                move(LEFT, SPEED),
                offscreen({ destroy: true }),
                "pipe",
                { passed: false },
            ]);

            add([
                rect(76, 12, { radius: 3 }),
                pos(x - 6, h + PIPE_GAP),
                color(97, 198, 65),
                outline(2, rgb(56, 158, 45)),
                move(LEFT, SPEED),
                offscreen({ destroy: true }),
                z(13),
            ]);
        }

        function flap() {
            if (!started) {
                started = true;
                readyText.destroy();
                loop(1.35, spawnPipe);
            }
            bird.jump(JUMP_FORCE);
            wing.scale = vec2(1.15, 0.85);
            wait(0.09, () => {
                wing.scale = vec2(1, 1);
            });
        }

        onKeyPress("space", flap);
        onMousePress(flap);

        bird.onCollide("pipe", () => {
            shake(8);
            go("gameover", score);
        });

        bird.onUpdate(() => {
            if (!started) {
                bird.pos.y = height() / 2 + Math.sin(time() * 4) * 6;
            }

            const tilt = Math.max(-25, Math.min(50, bird.vel.y * 0.07));
            bird.angle = tilt;

            wing.pos = vec2(bird.pos.x - 6, bird.pos.y + 2);
            wing.angle = tilt * 0.7;
            eyeWhite.pos = vec2(bird.pos.x + 4, bird.pos.y - 4);
            eyePupil.pos = vec2(bird.pos.x + 5, bird.pos.y - 4);
            beak.pos = vec2(bird.pos.x + 11, bird.pos.y);
            beak.angle = tilt * 0.35 - 10;

            if (bird.pos.y > height() - 44 || bird.pos.y < -24) {
                go("gameover", score);
            }
        });

        onUpdate("pipe", (p) => {
            if (p.passed === false && p.pos.x < bird.pos.x) {
                score++;
                scoreLabel.text = String(score);
                p.passed = true;
            }
        });
    });
}
