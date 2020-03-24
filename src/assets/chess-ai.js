const pawnValueWhite = [
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
    [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
    [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
    [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
    [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
    [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
];

const knightValue = [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
    [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
    [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
    [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
    [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
    [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

const bishopValueWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];
const rookValueWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

const queenValue = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

const kingValueWhite = [
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

function reverseArray(array) {
    return array.slice().reverse();
}

const pawnValueBlack = reverseArray(pawnValueWhite);
const bishopValueBlack = reverseArray(bishopValueWhite);
const rookValueBlack = reverseArray(rookValueWhite);
const kingValueBlack = reverseArray(kingValueWhite);

export default {
    async calculateBestMove(depth, game, isMaximisingPlayer) {
        const moves = game.moves();
        let bestMove = Number.NEGATIVE_INFINITY;
        let bestMoveFound = null;

        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            game.move(move);

            const value = this.minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
            game.undo();

            if (value >= bestMove) {
                bestMove = value;
                bestMoveFound = move;
            }
        }
        return bestMoveFound;
    },
    
    minimax(depth, game, alpha, beta, isMaximisingPlayer) {
        if (depth === 0) {
            const value = this.evaluateBoard(game.board());
            return isMaximisingPlayer ? -1 * value : value;
        }

        const moves = game.moves();

        let bestMove = isMaximisingPlayer ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;

        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            game.move(move);

            const evaluation = this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer);
            bestMove = isMaximisingPlayer ? Math.max(bestMove, evaluation) : Math.min(bestMove, evaluation);

            game.undo();

            if (isMaximisingPlayer) {
                alpha = Math.max(alpha, bestMove);
                if (beta <= alpha) {
                    return bestMove;
                }
            } else {
                beta = Math.min(beta, bestMove);
                if (beta <= alpha) {
                    return bestMove;
                }
            }
        }

        return bestMove;
    },

    evaluateBoard(board) {
        let totalEvaluation = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                totalEvaluation = totalEvaluation + this.getPieceValue(board[i][j], i, j);
            }
        }
        return totalEvaluation;
    },
    getPieceValue(piece, x, y) {
        if (piece === null) {
            return 0;
        }

        const isWhite = piece.color === 'w';

        let value = 0;
        switch (piece.type) {
            case 'p':
                value = 10 + (isWhite ? pawnValueWhite[y][x] : pawnValueBlack[y][x]);
                break;
            case 'n':
                value = 30 + knightValue[y][x];
                break;
            case 'b':
                value = 30 + (isWhite ? bishopValueWhite[y][x] : bishopValueBlack[y][x]);
                break;
            case 'r':
                value = 50 + (isWhite ? rookValueWhite[y][x] : rookValueBlack[y][x]);
                break;
            case 'q':
                value = 90 + queenValue[y][x];
                break;
            case 'k':
                value = 900 + (isWhite ? kingValueWhite[y][x] : kingValueBlack[y][x]);
                break;
            default:
                throw 'Unknown piece: ' + piece.type;
        }

        return isWhite ? value : -value;
    },
    calculateMoveValue(move, depth, game, isMaximisingPlayer) {
        game.move(move);
        const value = this.minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        return value;
    },
}