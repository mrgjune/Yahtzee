import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    // Part two Fix clicking Dice----- toggeledLock did not get currect this. BIND it
    this.toggleLocked = this.toggleLocked.bind(this)
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map(
        (d, i) => st.locked[i] ? d : Math.ceil(Math.random() * 6)),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft === 0 ? st.rollsLeft: st.rollsLeft -1
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not. 
    // PART FIVE----FIXED If st.rollsLeft is 0 toggle is no longer available
    this.setState(st => (
      st.rollsLeft === 0 ? {} : {locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ],
    }))
  }
  
  doScore(rulename, ruleFn) {
   // evaluate this ruleFn with the dice and score this rulename

  // PART SIX---FIXED score is only going to change state if score is undefined
    this.setState(st => (
      st.scores[rulename] !== undefined ? {} :
      {scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
    }));
   
    this.roll();
  }

  render() {
    return (
      <section>
        <Dice dice={this.state.dice} locked={this.state.locked} toggleLocked={this.toggleLocked} />
        <button
          className="Game-reroll"
          disabled={this.state.locked.every(x => x)}
          onClick={this.roll}>
          {this.state.rollsLeft} Rerolls Left
        </button>
        <ScoreTable doScore={this.doScore} scores={this.state.scores} />
      </section >
    );
  }
}

export default Game;