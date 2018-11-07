import React from 'react'
import ReactDom from 'react-dom'
import './board.css'
import Axios from 'axios'
// import Card1 from '../img/img1.png'
// import Card2 from '../img/img2.png'
// import Card3 from '../img/img3.png'
// import Card4 from '../img/img4.png'
// import Card5 from '../img/img5.jpg'
// import Card6 from '../img/img6.jpg'
// import Card7 from '../img/img7.jpg'
// import Card8 from '../img/img8.jpg'

class Board extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			selected: null,
			board: null,
			cols: 4,
			rows: 4,
			current: null,
			cardsState: Array(16).fill('card'),
			refresh: true,
			// images: [Card1, Card2, Card3, Card4, Card5, Card6, Card7, Card8],
			ranImgs: Array(16).fill(null),
			cont: 0
		}

		this.getMaze()
	}

	getMaze() {
		Axios.get('http://34.210.35.174:3001/')
			.then(res => {
				console.log(res.data);
			})
			.catch(error => {
				console.log(error);
			})
	}

	handleClick(){

	}


	render(){
		return (
			<div className = "mainDiv">
			<div className = "header">
				<div className = "title"> Memory </div>
			</div>
			</div>
		)
	}
}

ReactDom.render(
	<Board />,
	document.getElementById('root')
)
