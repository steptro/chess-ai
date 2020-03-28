<template>
    <div class="container">
        <div id="app">
            <div class="columns">
                <div class="column">
                    <label class="label">Actions</label>
                    <div class="controls">
                        <div class="buttons is-centered">
                            <b-button class="is-fullwidth" :loading="calculatingBestMove" @click="doBestMove">Do best move</b-button>
                            <b-button class="is-fullwidth" @click="makeRandomMove">Do random move</b-button>
                            <b-button class="is-fullwidth" @click="evaluateBoard">Evaluate board</b-button>
                            <b-button class="is-fullwidth" @click="resetBoard">Reset board</b-button>
                        </div>
                    </div>

                    <br>

<!--                    <b-field label="FEN" label-position="on-border">-->
<!--                        <b-input ref="importFen" @click.native="selectFen" v-model="fen" expanded  />-->
<!--                        <p class="control">-->
<!--                            <b-button class="is-primary" @click="importFen">Import</b-button>-->
<!--                        </p>-->
<!--                    </b-field>-->

                    <label class="label">Stats</label>
                    <table class="table is-bordered is-striped is-fullwidth stats">
                        <tbody>
                            <tr>
                                <td>Time</td>
                                <td>{{ this.format(this.duration / 1000) }} s</td>
                            </tr>
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

                    <label class="label">Settings</label>
                    <b-field label="Depth" horizontal>
                        <b-select placeholder="Depth" v-model="depth" expanded>
                            <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                        </b-select>
                    </b-field>
                    
                    <label class="label">History</label>
                    <table class="table is-striped is-narrow is-fullwidth history is-centered">
                        <tbody>
                            <tr v-for="(move, index) in game.history()" :key="index" >
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
    import numeral from 'numeral';

    export default {
        name: 'App',
        mounted() {
            window.addEventListener('keyup', this.keyup);
            
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
                calculatingBestMove: false,
                boardValue: 0,
                duration: 0,
            }
        },
        methods: {
            keyup(event) {
                if (event.keyCode === 37) {
                    this.game.undo();
                }
                
                if (event.keyCode === 39) {
                    console.log('right');
                }
            },
            moved({orig, dest}) {
                this.game.move({from: orig, to: dest, promotion: 'q'});
                this.fen = this.game.fen();
            },
            doBestMove() {
                if (this.game.game_over()) {
                    return;
                }
                
                this.calculatingBestMove = true;
                const start = performance.now();
                
                setTimeout(() => {
                    const isMaximisingPlayer = this.game.turn() === 'w';
                    chessAI.calculateBestMove(this.depth, this.game, isMaximisingPlayer)
                        .then(bestMove => {
                            this.bestMove = bestMove;
                            this.game.move(this.bestMove);
                            
                            const history = this.game.history({ verbose: true });
                            const last = history[history.length - 1];
                            this.$refs.board.board.move(last.from, last.to);

                            this.calculatingBestMove = false;
                            const end = performance.now();
                            this.duration = end - start;

                            setTimeout(() => {
                                this.fen = this.game.fen();
                            }, 500);
                            
                            this.evaluateBoard();
                        });
                }, 0);
            },
            makeRandomMove() {
                const possibleMoves = this.game.moves();

                if (this.game.game_over()) {
                    return
                }

                const randomIdx = Math.floor(Math.random() * possibleMoves.length);
                this.game.move(possibleMoves[randomIdx]);

                const history = this.game.history({ verbose: true });
                const last = history[history.length - 1];
                this.$refs.board.board.move(last.from, last.to);
                
                setTimeout(() => {
                    this.fen = this.game.fen();
                }, 500);

                this.evaluateBoard();
            },
            evaluateBoard() {
                this.boardValue = chessAI.evaluateBoard(this.game.board());
            },
            resetBoard() {
                this.game = new Chess();
                this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            },
            selectFen() {
                this.$refs.importFen.getElement().select();
            },
            isEven(number) {
                return !(number & 1);
            },
            format(number) {
                return numeral(number).format('0.000');
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
    
    .stats td, .history td {
        width: 50%;
    }
</style>
