<template>
    <div class="container">
        <div id="app">
            <div class="columns">
                <div class="column">
                    <h1 class="title">Settings</h1>

                    <b-field label="Depth" horizontal>
                        <b-select placeholder="Depth" v-model="depth" expanded>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </b-select>
                    </b-field>
                    
                    <div class="controls">
                        <div class="buttons is-centered">
                            <b-button class="is-fullwidth" :loading="generatingMove" @click="doBestMove">Do best move</b-button>
                            <b-button class="is-fullwidth" @click="makeRandomMove">Do random move</b-button>
                            <b-button class="is-fullwidth" @click="evaluateBoard">Evaluate board</b-button>
                        </div>
                    </div>

                    <br>

                    <b-field label="Import fen">
                        <b-input ref="importFen" @click.native="importFen" v-model="fen" expanded  />
                    </b-field>
                    
                    <table class="table is-bordered is-fullwidth">
                        <tbody>
                            <tr>
                                <td>Best move</td>
                                <td>{{ this.bestMove}}</td>
                            </tr>
                            <tr>
                                <td>Board value</td>
                                <td>{{ this.boardValue }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <label class="label">History</label>
                    <table class="table is-bordered is-striped is-narrow is-fullwidth">
                        <tbody>
                            <tr v-for="(move, index) in game.history()" :key="index">
                                <td v-if="isEven(index)">{{ index + 1 }} White</td>
                                <td v-else><b>{{ index + 1 }} Black</b></td>
                                <td v-if="isEven(index)">{{ move }}</td>
                                <td v-else><b>{{ move }}</b></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div class="column">
                    <chessboard ref="board" :fen="fen" @moved="moved" />
                </div>
            </div>
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
            
            // for (let i = 0; i < 100; i++) {
            //     this.makeRandomMove();
            // }
            
            this.game.load(this.fen);
        },
        data() {
            return {
                game: new Chess(),
                board: null,
                fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                depth: 3,
                positions: 0,
                bestMove: '',
                generatingMove: false,
                boardValue: 0,
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
            evaluateBoard() {
                this.boardValue = chessAI.evaluateBoard(this.game.board());
            },
            importFen() {
                console.log('import fen');
                this.$refs.importFen.getElement().select();
            },
            isEven(number) {
                return !(number & 1);
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }
    
    .field-label {
        padding-top: .375em;
    }
</style>
