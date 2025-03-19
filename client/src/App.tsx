import { useRef, useEffect, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";

function App() {


    // Referência para o PhaserGame
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const addSprite = () => {
        if (phaserRef.current) {
            const scene = phaserRef.current.scene;

            if (scene) {
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);
                scene.add.sprite(x, y, "star");
            }
        }
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            <div>
                <div></div>
            </div>
        </div>
    );
}

export default App;

