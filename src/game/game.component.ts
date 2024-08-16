import {InputHandler} from "./service/input-handler";


export class GameComponent {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private player: any;
    private platforms: Array<{ x: number, y: number, width: number, height: number }>;
    private background: HTMLImageElement;
    private backgroundX: number;
    private gravity: number = 1;
    private gameSpeed: number = 10;

    constructor(canvas: HTMLCanvasElement, private inputHandler: InputHandler) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = 800;
        this.canvas.height = 400;

        this.backgroundX = 0;
        this.background = new Image();
        this.background.src = '/assets/background.png';

        this.player = {
            x: 50,
            y: this.canvas.height - 150,
            width: 50,
            height: 50,
            dy: 0,
            jumpPower: -10,
            isJumping: false,
            draw: () => {
                this.ctx.fillStyle = 'red';
                this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
            },
            update: () => {
                this.player.y += this.player.dy;
                if (this.player.y + this.player.height < this.canvas.height) {
                    this.player.dy += this.gravity;
                } else {
                    this.player.dy = 0;
                    this.player.isJumping = false;
                    this.player.y = this.canvas.height - this.player.height;
                }
            },
            jump: () => {
                if (!this.player.isJumping) {
                    this.player.isJumping = true;
                    this.player.dy = this.player.jumpPower;
                }
            }
        };

        this.platforms = [
            { x: 100, y: this.canvas.height - 100, width: 100, height: 20 },
            { x: 250, y: this.canvas.height - 150, width: 100, height: 20 },
            { x: 400, y: this.canvas.height - 100, width: 100, height: 20 },
        ];

        this.gameLoop(); // Start the game loop
    }

    private drawPlatforms(): void {
        this.ctx.fillStyle = '#654321';
        this.platforms.forEach(platform => {
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });
    }

    private detectPlatformCollision(): void {
        this.platforms.forEach(platform => {
            if (
                this.player.y + this.player.height <= platform.y &&
                this.player.y + this.player.height + this.player.dy >= platform.y &&
                this.player.x + this.player.width >= platform.x &&
                this.player.x <= platform.x + platform.width
            ) {
                this.player.dy = 0;
                this.player.isJumping = false;
                this.player.y = platform.y - this.player.height;
            }
        });
    }

    private drawBackground(): void {
        this.ctx.drawImage(this.background, this.backgroundX, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background, this.backgroundX + this.canvas.width, 0, this.canvas.width, this.canvas.height);

        this.backgroundX -= this.gameSpeed;

        if (this.backgroundX <= -this.canvas.width) {
            this.backgroundX = 0;
        }
    }

    private gameLoop = (): void => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();
        this.player.update();
        this.player.draw();

        this.drawPlatforms();
        this.detectPlatformCollision();

        // Check if the space key is pressed and trigger the player's jump
        if (this.inputHandler.isKeyPressed('Space')) {
            this.player.jump();
        }

        requestAnimationFrame(this.gameLoop);
    };
}
