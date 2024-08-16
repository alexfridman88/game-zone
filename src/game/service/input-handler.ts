export class InputHandler {
    private keys: { [key: string]: boolean } = {};

    constructor() {
        // Listen to keydown events
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keys[event.code] = true;
        });

        // Listen to keyup events to know when the key is released
        document.addEventListener('keyup', (event: KeyboardEvent) => {
            this.keys[event.code] = false;
        });
    }

    // Check if a specific key is pressed
    isKeyPressed(key: string): boolean {
        return this.keys[key];
    }
}
