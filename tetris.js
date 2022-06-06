const gameClock = 1000;
const blockSideLength = 10;
const blockWidth = 30;
const blockHeight = 15;
const scoreWorth=10;
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
    '#000000',
    '#FF0000',
    '#00FF00',
    'rgb(0, 103, 147)',
    '#FFFF00',
    '#00FFFF',
    '#10FF01',
    '#F000FF'
]
class Piece{
    constructor(shape,ctx){
        this.shape = shape;
        this.ctx = ctx;
        this.x = Math.floor(blockWidth / 2);
        this.y = 0;
    }
    renderPiece(){
        this.shape.map((row,i)=>{
            row.map((block,j)=>{
                if(block>0){
                    this.ctx.fillStyle=colors[block];
                    this.ctx.fillRect(this.x+j,this.y+i,1,1);
                    // this.ctx.strokeStyle='black';
                    // this.ctx.strokeRect(this.x+j,this.y+i,1,1);
                }
            })
        });
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
        for(var i=0;i<blockHeight;i++){
            board.push([]);
            for(var j=0;j<blockWidth;j++){
                board[board.length-1].push(0);
            }
        }
        return board;
    }
    collision(x,y){
        const shape=this.fallingPiece.shape;
        const n=shape.length;
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                if(shape[i][j]>0){
                    let p=x+j;
                    let q=y+i;
                    if(p>=0&&p<blockWidth&&q<blockHeight){
                        if(this.board[q][p]>0){
                            return true;
                        }
                    }else{
                        return true;
                    }
                }
            }
        }
        return false;
    }
    renderGameState(){
        for(let i=0;i<this.board.length;i++){
            for(let j=0;j<this.board[i].length;j++){
                let cell = this.board[i][j];
                this.ctx.fillStyle = colors[cell];
                this.ctx.fillRect(j,i,1,1);
                // this.ctx.strokeStyle = 'grey';
                // this.ctx.strokeRect(j,i,1,1);
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece();
        }
    }
    moveDown(){
        if(this.fallingPiece===null){
            this.renderGameState();
        }else if(this.collision(this.fallingPiece.x,this.fallingPiece.y+1)){
            const shape=this.fallingPiece.shape;
            const x=this.fallingPiece.x;
            const y=this.fallingPiece.y;
            shape.map((row,i)=>{
                row.map((cell,j)=>{
                    let p=x+j;
                    let q=y+i;
                    if(p>=0&&p<blockWidth&&q<blockHeight&&cell>0){
                        this.board[q][p]=shape[i][j];
                    }
                })
            });
            this.fallingPiece=null;
        }else{
            this.fallingPiece.y+=1;
        }
        this.renderGameState();
    }
}
const gamesEl=document.getElementById('games');
const scoreEl=document.getElementById('scoreboard');
const ctx=gamesEl.getContext('2d');
gamesEl.width=blockWidth*blockSideLength;
gamesEl.height=blockHeight*blockSideLength;
ctx.scale(blockSideLength,blockSideLength);
const board=new Board(ctx);
function newGameState(){
    fullSend();
    if(board.fallingPiece===null){
        var rand=Math.floor(Math.random()*shapes.length);
        const piece=new Piece(shapes[rand],ctx);
        board.fallingPiece=piece;
        board.moveDown();
    }else{
        board.moveDown();
    }
}
function fullSend(){
    const allFilled=(row)=>{
        for(let x of row){
            if(x===0){
                return false;
            }
        }
        return true;
    }
    for(let i=0;i<board.board.length;i++){
        if(allFilled(board.board[i])){
            score+=scoreWorth;
           model.grid.splice(i,1);
           model.grid.unshift(new Array(10).fill(0));
        }
    }
}
setInterval(newGameState,gameClock);