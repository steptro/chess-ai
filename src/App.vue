<template>
    <div class="container">
        <div id="app">
            <chessboard ref="board" :fen="fen" @moved="moved" />

            <div class="controls">
                <div class="buttons is-centered">
                    <b-button :loading="generatingMove" @click="doBestMove">Do best move</b-button>
                    <b-button @click="makeRandomMove">Do random move</b-button>
                </div>
            </div>
            
            <span>Best move: {{ this.bestMove }}</span>
        </div>
    </div>
</template>

<script>
    import Chess from 'chess.js';
    import chessAI from './assets/chess-ai';

    export default {
        name: 'App',
        mounted() {
            window.addEventListener('keyup', this.keyup);
        },
        data() {
            return {
                game: new Chess(),
                board: null,
                fen: '',
                depth: 3,
                positions: 0,
                bestMove: '',
                generatingMove: false,
            }
        },
        methods: {
            keyup(event) {
                if (event.keyCode === 37) {
                    this.game.undo();
                    this.fen = this.game.fen();
                }
                
                if (event.keyCode === 39) {
                    console.log('right');
                }
            },
            moved({orig, dest}) {
                console.log('moved', orig, dest);
                this.game.move({from: orig, to: dest, promotion: 'q'});
                this.fen = this.game.fen();
            },
            doBestMove() {
                if (this.game.game_over()) {
                    return;
                }
                
                this.generatingMove = true;
                
                setTimeout(() => {
                    const isMaximisingPlayer = this.game.turn() === 'w';
                    chessAI.calculateBestMove(this.depth, this.game, isMaximisingPlayer)
                        .then(bestMove => {
                            this.bestMove = bestMove;
                            this.game.move(this.bestMove);
                            this.fen = this.game.fen();

                            this.generatingMove = false;
                        });
                }, 100)
            },
            makeRandomMove() {
                const possibleMoves = this.game.moves();

                if (this.game.game_over()) {
                    return
                }

                const randomIdx = Math.floor(Math.random() * possibleMoves.length);
                this.game.move(possibleMoves[randomIdx]);
                this.fen = this.game.fen();
            },
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    
    .controls {
        margin-top: 50px;
    }
</style>
