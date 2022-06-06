const gameClock = 1000;
const blockSideLength = 20;
const blockWidth = 10;
const blockHeight = 20;
const shapes=[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [2,0,0],
        [2,2,2],
        [0,0,0]
    ],
    [
        [0,0,3],
        [3,3,3],
        [0,0,0]
    ],
    [
        [4,4],
        [4,4]
    ],
    [
        [0,5,5],
        [5,5,0],
        [0,0,0]
    ],
    [
        [0,6,0],
        [6,6,6],
        [0,0,0]
    ],
    [
        [7,7,0],
        [0,7,7],
        [0,0,0]
    ]
]
const colors=[
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0, 0.5)',
    // 'rgb(255, 153, 0)',
]
const gamesEl=document.getElementById('games');
const scoreEl=document.getElementById('scoreboard');
const ctx=gamesEl.getContext('2d');
gamesEl.width=blockSideLength*blockWidth;
gamesEl.height=blockSideLength*blockHeight;
class Piece{
    constructor(shape,ctx){
        this.shape = shape;
        this.x = 3*blockSideLength;
        this.y = 0;
        this.ctx = ctx;
        this.color = colors[Math.floor(Math.random()*colors.length)];
    }
    renderPiece(){
        for(let y=0;y<this.shape.length;y++){
            for(let x=0;x<this.shape[y].length;x++){
                if(this.shape[y][x]!==0){
                    this.ctx.fillStyle = this.color;
                    this.ctx.fillRect(this.x+x*blockSideLength,this.y+y*blockSideLength,blockSideLength,blockSideLength);
                    this.ctx.strokeStyle = 'black';
                    this.ctx.strokeRect(this.x+x*blockSideLength,this.y+y*blockSideLength,blockSideLength,blockSideLength);
                }
            }
        }
    }
}
class Board{
    constructor(ctx){
        this.ctx = ctx;
        this.fallingPiece = null;
        this.board = this.createBoard();
    }
    createBoard(){
        let board = [];
        for(let y=0;y<blockHeight;y++){
            board[y] = [];
            for(let x=0;x<blockWidth;x++){
                board[y][x] = 0;
            }
        }
        return board;
    }
    renderBoard(){
        for(let y=0;y<blockHeight;y++){
            for(let x=0;x<blockWidth;x++){
                if(this.board[y][x]===0){
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(x*blockSideLength,y*blockSideLength,blockSideLength,blockSideLength);
                    this.ctx.strokeStyle = 'grey';
                    this.ctx.strokeRect(x*blockSideLength,y*blockSideLength,blockSideLength,blockSideLength);
                }
            }
        }
    }
    renderGameState(){
        for(let i=0;i<this.board.length;i++){
            for(let j=0;j<this.board[i].length;j++){
                let cell = this.board[i][j];
                this.ctx.fillStyle = 'yellow';
                this.ctx.fillRect(j*blockSideLength,i*blockSideLength,blockSideLength,blockSideLength);
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece();
        }
    }
    moveDown(){
        this.fallingPiece.renderPiece();
        this.fallingPiece.y+=blockSideLength;
    }
}
function newGameState(){
    const board=new Board(ctx);
    if(board.fallingPiece===null){
        const piece=new Piece(shapes[2],ctx);
        let rand=Math.floor(Math.random()*shapes.length);
        board.fallingPiece=piece;

        board.moveDown();
    }
    requestAnimationFrame(newGameState);
}
newGameState();