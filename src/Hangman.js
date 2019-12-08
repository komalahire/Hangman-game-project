import React, { Component } from "react";
import "./index.css";
import image0 from "./Images/0.jpg";
import image1 from "./Images/1.jpg";
import image2 from "./Images/2.jpg";
import image3 from "./Images/3.jpg";
import image4 from "./Images/4.jpg";
import image5 from "./Images/5.jpg";
import image6 from "./Images/6.jpg";
const items = ["python", "html", "css", "java",];
const images = [image0, image1, image2, image3, image4, image5, image6];

let newGuessWord = () => items[Math.floor(Math.random() * items.length)];
var alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

class HangmanGame extends Component {
	constructor(props) {
		super(props);
		var a = newGuessWord()
		this.state = {
			lifes: images.length - 1,
			secretWord:a,
			Left_word:a,
			alreadySelectedAlphabets: "",
			// filterWord: newGuessWord(),
		}
	};
	handleAplhabetClick = alphabet => {
		this.setState(prevState => ({
			alreadySelectedAlphabets: prevState.alreadySelectedAlphabets + alphabet,
			lifes: this.state.secretWord.includes(alphabet) ? prevState.lifes : prevState.lifes - 1,
			Left_word:words,
			b:words.length
			,
		}));
	var words = this.state.Left_word.replace(new RegExp(alphabet, 'g'), '');
	
	}

	handleReset = () => {
		var a = newGuessWord()
		this.setState({
			lifes: images.length - 1,
			secretWord:a,
			alreadySelectedAlphabets: "",
			Left_Word:a,
			b:a.length
		});
	};

	render() {
		const secretWordLetterList = this.state.secretWord.split("");
		
		return (
			<div>
                <p className="kom">  Guesses Left : {this.state.lifes}</p>
				<div className="center">
					<img
						src={images[images.length - this.state.lifes - 1]}
						className="image_center"
						alt="image0"
					/>
					<p className="text">Guess the Programming Language ?</p>
					{secretWordLetterList.map(alphab =>
						this.state.alreadySelectedAlphabets.includes(alphab) ||
							this.state.lifes <= 0 ? (
								<span> {alphab} </span>
							) : (
								<span> _ </span>
							)
					)}

				</div>

				<div id="button_set">
				{this.state.lifes === 0 ? <p className="lostGame">You Lost</p> :null}
				{this.state.b === 0 ? <p className="wonGame">you won</p>:null }
					{this.state.lives === 0 || this.state.b === 0
					? null
						
					: alphabets.map(alphabet => (
							<button
								onClick={() => this.handleAplhabetClick(alphabet)}
								className="set_alphabate"
								disabled={this.state.alreadySelectedAlphabets.includes(alphabet)}>
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
}
export default HangmanGame;