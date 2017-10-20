// All code should be written in this file.
let playerOneMoveOneType = undefined;
let playerOneMoveOneValue = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeType = undefined;
let playerOneMoveThreeValue = undefined;
let playerTwoMoveOneType = undefined;
let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeType = undefined;
let playerTwoMoveThreeValue = undefined;

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue)
{
  if(isMoveValid(moveOneType)  && isValid(moveOneValue) && isMoveValid(moveTwoType) && isValid(moveTwoValue) && isMoveValid(moveThreeType) && isValid(moveThreeValue))
  {
    if(moveOneValue + moveTwoValue + moveThreeValue > 99)
      return null;

    if(moveOneValue > 99 || moveTwoValue > 99 || moveThreeValue > 99)
      return null;

    if(moveOneValue < 1 || moveTwoValue < 1 || moveThreeValue < 1)
      return null;

    if(player === 'Player One')
    {
      playerOneMoveOneType = moveOneType;
      playerOneMoveOneValue = moveOneValue;
      playerOneMoveTwoType = moveTwoType;
      playerOneMoveTwoValue = moveTwoValue;
      playerOneMoveThreeType = moveThreeType;
      playerOneMoveThreeValue = moveThreeValue;
    }
    else if(player === 'Player Two')
    {
      playerTwoMoveOneType = moveOneType;
      playerTwoMoveOneValue = moveOneValue;
      playerTwoMoveTwoType = moveTwoType;
      playerTwoMoveTwoValue = moveTwoValue;
      playerTwoMoveThreeType = moveThreeType;
      playerTwoMoveThreeValue = moveThreeValue;
    }
  }
};

function isMoveValid(move)
{
  if(move !== undefined)
  {
    if(move === 'rock' || move === 'paper' || move === 'scissors')
    {
      return true;
    }
  }
};

function isValid(value){
  if(value !== undefined)
    return true;
}

function getRoundWinner(roundNumber){
  switch (roundNumber) {
    case 1: // Round One
      // Check for invalid valueId
      if(!isMoveValid(playerOneMoveOneType) || !isValid(playerOneMoveOneValue) || !isMoveValid(playerTwoMoveOneType) || !isValid(playerTwoMoveOneValue))
        return null;
      // Compare the moves for round one
      return compareMoves(playerOneMoveOneType, playerTwoMoveOneType, playerOneMoveOneValue, playerTwoMoveOneValue);
      break;

    case 2: // Round Two
      // Check for invalid valueId
      if(!isMoveValid(playerOneMoveTwoType) || !isValid(playerOneMoveTwoValue) || !isMoveValid(playerTwoMoveTwoType) || !isValid(playerTwoMoveTwoValue))
        return null;
      // Compare the moves for round two
      return compareMoves(playerOneMoveTwoType, playerTwoMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoValue);
      break;

    case 3: // Round Three
      // Check for invalid valueId
      if(!isMoveValid(playerOneMoveThreeType) || !isValid(playerOneMoveThreeValue) || !isMoveValid(playerTwoMoveThreeType) || !isValid(playerTwoMoveThreeValue))
        return null;
      // Compare the moves for round three
      return compareMoves(playerOneMoveThreeType, playerTwoMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeValue);
      break;
    default:
      return null;
  }
};

function compareMoves(moveA, moveB, valueA, valueB)
{
  switch (moveA) {
    case 'rock':
      if(moveB === 'rock')
        // Need to compare the values
        return compareValues(valueA, valueB);
      else if(moveB === 'paper')
        return 'Player Two';
      else if(moveB === 'scissors')
        return 'Player One';
      break;

    case 'paper':
      if(moveB === 'rock')
        return 'Player One';
      else if(moveB === 'paper')
        // Need to compare the values
        return compareValues(valueA, valueB);
      else if(moveB === 'scissors')
        return 'Player Two';
      break;

    case 'scissors':
    if(moveB === 'rock')
      return 'Player Two';
    else if(moveB === 'paper')
      // Need to compare the values
      return 'Player One';
    else if(moveB === 'scissors')
      return compareValues(valueA, valueB);
      break;

    default:
      return null;
  }
};

function compareValues(moveVal1, moveVal2)
{
  if(moveVal1 > moveVal2)
    return 'Player One';
  else if(moveVal1 < moveVal2)
    return 'Player Two';
  else if(moveVal1 === moveVal2)
    return 'Tie';
};

function checkAllValues()
{
  if(
    playerOneMoveOneType === undefined ||
    playerOneMoveOneValue === undefined ||
    playerOneMoveTwoType === undefined ||
    playerOneMoveTwoValue === undefined ||
    playerOneMoveThreeType === undefined ||
    playerOneMoveThreeValue === undefined ||
    playerTwoMoveOneType === undefined ||
    playerTwoMoveOneValue === undefined ||
    playerTwoMoveTwoType === undefined ||
    playerTwoMoveTwoValue === undefined ||
    playerTwoMoveThreeType === undefined ||
    playerTwoMoveThreeValue === undefined
  )
    return true;
}

function getGameWinner()
{
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let roundWinner = undefined;

    if(checkAllValues())
      return null;

    roundWinner = getRoundWinner(1);
    if(roundWinner === 'Player One')
      playerOneScore += 1;
    else if(roundWinner === 'Player Two')
      playerTwoScore += 1;

    roundWinner =  getRoundWinner(2);
    if(roundWinner === 'Player One')
      playerOneScore += 1;
    else if(roundWinner === 'Player Two')
      playerTwoScore += 1;

    roundWinner =  getRoundWinner(3);
    if(roundWinner === 'Player One')
      playerOneScore += 1;
    else if(roundWinner === 'Player Two')
      playerTwoScore += 1;

    return compareValues(playerOneScore, playerTwoScore);
}

function setComputerMoves()
{
    let v1 = getRandomValue(99);
    let v2 = getRandomValue(99 - v1);
    let v3 = 99 - v1 - v2;

    playerTwoMoveOneType = getRandomMove();
    playerTwoMoveTwoType = getRandomMove();
    playerTwoMoveThreeType = getRandomMove();

    playerTwoMoveOneValue = v1;
    playerTwoMoveTwoValue = v2;
    playerTwoMoveThreeValue = v3;
}

function getRandomMove()
{
    const randomVal = Math.floor(Math.random() * 3);
    switch (randomVal) {
      case 1:
        return 'rock';
        case 2:
        return 'paper';
      default:
        return 'scissors';
    }
}

function getRandomValue(topValue){
  return Math.floor(Math.random() * topValue);
}
