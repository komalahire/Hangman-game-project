import React, { Component } from "react";
import "./index.css";
import image0 from "./Images/0.jpg";
import image1 from "./Images/1.jpg";
import image2 from "./Images/2.jpg";
import image3 from "./Images/3.jpg";
import image4 from "./Images/4.jpg";
import image5 from "./Images/5.jpg";
import image6 from "./Images/6.jpg";

const items = ["python", "javascript", "mongodb", "java", "html", "css", "c",  "kotlin", "php", "ruby"];
const images = [image0, image1, image2, image3, image4, image5, image6];

const newGuessWord = () => items[Math.floor(Math.random() * items.length)];
var alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

class HangmanGame extends Component {
    constructor(props) {
        super(props);
        this.state = getInitialState();
    }

    handleAplhabetClick = alphabet => {
        if (this.shouldNotBeAbleToPlay()) {
            return;
        }
        this.setState(prevState => ({
            alreadySelectedAlphabets: prevState.alreadySelectedAlphabets + alphabet,
            lifes: guessIsWrong(
                prevState.secretWord,
                alphabet,
                prevState
            )
        }));
    };

    handleReset = () => {
        this.setState(getInitialState());
    };

    shouldNotBeAbleToPlay() {
        return this.state.lifes <= 0;
    }

    render() {
        const NO_KEYBOARD_TO_PLAY = null;
        const secretWordLetterList = this.state.secretWord.split("");
        return (
            <div>
                <p className="kom">  Guesses Left : {this.state.lifes}</p>
                <div className="center">
                    <img
                        src={images[this.nextImageToBeShown()]}
                        className="img_cenrer"
                        alt="image1"
                    />
                    <p className="text">Guess the Programming Language ?</p>
                    {secretWordLetterList.map(alphabet =>
                        this.selectedAplhabet(alphabet) ||
                            this.shouldNotBeAbleToPlay() ? (
                                <span> {alphabet} </span>
                            ) : (
                                <span> -</span>
                            )
                    )}
                </div>
                <div id="button_set">
                {this.state.lifes === 0 ? <h1 className="lostGame">you Lost the game</h1> : null}
                
                    {this.shouldNotBeAbleToPlay()
                        ? NO_KEYBOARD_TO_PLAY
                        : alphabets.map(alphabet => (
                            <button
                                onClick={() => this.handleAplhabetClick(alphabet)}
                                className="set_alphabate"
                                disabled={this.selectedAplhabet(alphabet)}
                            >
                                {alphabet}
                            </button>
                        ))}
                    <br />
                    <button onClick={this.handleReset} className="set_alphabate buttons">
                        reset
                    </button>
                </div>
            </div>
        );
    }

    selectedAplhabet(alphabet) {
        return this.state.alreadySelectedAlphabets.includes(alphabet);
    }

    nextImageToBeShown() {
        return images.length - 1 - this.state.lifes;
    }
}

function getInitialState() {
    return {
        lifes: images.length - 1,
        secretWord: newGuessWord(),
        alreadySelectedAlphabets: ""
    };
}

function guessIsWrong(secretWord, secretLetter, prevState) {
    return secretWord.includes(secretLetter)
        ? prevState.lifes
        : prevState.lifes - 1;
}

export default HangmanGame;