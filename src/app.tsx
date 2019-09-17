class Ball {
    // physics.
    public oldPosX: number|null = null;
    public oldPosY: number|null = null;

    public posX: number;
    public posY: number;

    public velX: number;
    public velY: number;

    // style parameters.
    public radius: number = 25;
    public fillColor: string = "#4422FF"

    constructor(posX: number, posY: number, velX: number=-5, velY: number=0) {
        this.posX = posX;
        this.posY = posY;

        this.velX = velX;
        this.velY = velY;
    }

    updatePos(): void {
        this.posX += this.velX;
        this.posY += this.velY;
    }
}

class App {
    private ball: Ball;

    private canvas: any;
    private ctx: any;

    private height: number = 500;
    private width: number = 500;

    private borderWidth: number = 2;
    private bgColor: string = "#CCCCFF";

    constructor() {
        this.ball = new Ball(
            Math.floor(this.width / 2),
            Math.floor(this.height / 2),
            Math.random() * 10,
            Math.random() * 10,
        );

        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.ctx = this.canvas.getContext('2d');
    }

    public setup(): void {
        this.clearCanvas();

        this.gameLoop();
    }

    private gameLoop(): void {
        requestAnimationFrame(this.gameLoop.bind(this));

        this.ball.updatePos();

        // collision on left or right.
        // let ang: number;
        if (this.ball.posX < 0 + this.ball.radius ||
            this.ball.posX > this.width - this.ball.radius) {

            // ang = Math.atan((this.ball.posX - oldX) / (this.ball.posY - oldY));
            this.ball.posX -= this.ball.velX;

            this.ball.velX = -1 * this.ball.velX;

        }
        else if (this.ball.posY < 0 + this.ball.radius ||
                 this.ball.posY > this.height - this.ball.radius) {

            this.ball.velY = -1 * this.ball.velY;
        }

        this.render();
    }

    private clearCanvas(): void {
        this.ctx.clearRect(
            this.ball.posX-this.ball.radius,
            this.ball.posY-this.ball.radius,
            this.ball.posX+this.ball.radius,
            this.ball.posY+this.ball.radius,
        );

        this.ctx.beginPath();
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.lineWidth = `${this.borderWidth}`
        this.ctx.fillStyle = "#000000";
        this.ctx.rect(
            this.borderWidth, this.borderWidth,
            this.canvas.width-(this.borderWidth+1), this.canvas.height-(this.borderWidth+1),
        );
        this.ctx.stroke();
    }

    private render(): void {
        this.clearCanvas();

        this.ctx.beginPath();
        this.ctx.ellipse(
            this.ball.posX,
            this.ball.posY,
            this.ball.radius,
            this.ball.radius,
            0,
            0,
            Math.PI * 2,
        );
        this.ctx.fillStyle = this.ball.fillColor;
        this.ctx.fill();
        this.ctx.stroke();
    }
}

window.onload = () => {
    let app = new App();

    app.setup();
}
