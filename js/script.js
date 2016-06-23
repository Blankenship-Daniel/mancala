/**********************************************
 * CONFIGURATION
 * Each row contains the given row including
 *  the players score bank either on the left
 *  or the right of the board.
 *********************************************/
var GAME_BOARD;
var ACROSS = {
    '1': 13,
    '2': 12,
    '3': 11,
    '4': 10,
    '5': 9,
    '6': 8,
    '8': 6,
    '9': 5,
    '10': 4,
    '11': 3,
    '12': 2,
    '13': 1
};

/**********************************************
 * DRAW BOARD
 * Display the results of each round.
 *********************************************/
function drawBoard()
{
    for (var i = 0; i < GAME_BOARD.length; i++)
    {
        $('.pos' + i).html('');
        var rocks = '';

        for (var j = 0; j < GAME_BOARD[i]; j++)
        {
            rocks += '<div class="rock"></div>';
        }

        $('.pos' + i).append(rocks);
    }
}

/**********************************************
 * DO TURN
 *  1. Passes in the .slot that has been
 *      clicked.
 *  2. Takes the number of .rock's contained
 *      in the .slot and sequentially adds
 *      one rock to each subsequent .slot.
 *********************************************/
function doTurn(elem)
{
    var initPos = elem.attr('data-slot-id');
    var currPos = initPos;
    var numRocks = GAME_BOARD[initPos];

    GAME_BOARD[initPos] = 0;

    for (var i = 0; i < numRocks; )
    {
        var slot = ++currPos % GAME_BOARD.length;
        var rocks = GAME_BOARD[slot];

        rocks++; i++;

        GAME_BOARD[slot] = rocks;

        // This is to track where the last rock
        //  lands.
        if (i == numRocks)
        {
            // if the rock count goes
            //  from 0 to 1 ...
            if (rocks == 1)
            {
                if (sameSide(initPos, slot) && GAME_BOARD[ACROSS[slot]] != 0)
                {
                    console.log('SAME SAME\n');
                    var jackpot = GAME_BOARD[ACROSS[slot]] + 1;

                    if (slot >= 1 && slot <= 8)
                    {
                        GAME_BOARD[7] += jackpot;
                    }
                    else if (slot >= 8 && slot <= 13)
                    {
                        GAME_BOARD[0] += jackpot;
                    }

                    GAME_BOARD[slot] = 0;
                    GAME_BOARD[ACROSS[slot]] = 0;
                }
            }
        }
    }
}

/**********************************************
 * SAME SIDE
 * Returns true if the last rock lands on the
 *  same side as it started.
 *********************************************/
function sameSide(beginningSlot, endingSlot)
{
    return ((beginningSlot >= 1 && beginningSlot <= 6) && (endingSlot >= 1 && endingSlot <= 6) ||
            (beginningSlot >= 8 && beginningSlot <= 13) && (endingSlot >= 8 && endingSlot <= 13));
}

$(document).ready(function() {
    GAME_BOARD = [0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4];

    // Initialize game board
    drawBoard();

    $('body').on('click', '.slot', function() {
        doTurn($(this));
        drawBoard();
    });

});
