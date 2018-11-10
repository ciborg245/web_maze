import React from 'react'
import ReactDom from 'react-dom'
import './board.css'
import Axios from 'axios'
import Wall from '../img/wall.png'
import Wall2 from '../img/wall2.png'
import Floor from '../img/floor.png'
import Goal from '../img/goal.png'
import LinkFront from '../img/link-front.png'
import LinkBack from '../img/link-back.png'
import LinkLeft from '../img/link-left.png'
import LinkRight from '../img/link-right.png'

class Board extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			w: 10,
			h: 10,
			map: [[null]],
			templateRows: '',
			templateColumns: '',
			width: 0,
			linkPos: [[null]],
			linkCoor: {x: 0, y: 0},
			goalCoor: {x: 0, y: 0}
		}

		this.getMaze()
	}

	// componentDidUpdate() {
	// 	this.maze.focus();
	// }

	getMaze() {
		let url = 'http://34.210.35.174:3001?w=' + this.state.w + '&h=' + this.state.h + '&type=json';
		Axios.get(url)
			.then(res => {
				var tempRows = '';
				var tempCols = '';

				let newMap = [];
				let newLink = [];
				let jumpCol = {};

				let prev = '';
				for (let i = 0; i < res.data[0].length; i++) {
					if (prev == '-' && res.data[0][i] == '-') {
						jumpCol[i] = null;
					}
					prev = res.data[0][i];
				}

				for (var i = 0; i < res.data.length; i++) {

					newMap.push([]);
					newLink.push([]);

					for (var j = 0; j < res.data[i].length; j++) {
						if (jumpCol.hasOwnProperty(j)) continue;

						if (res.data[i][j] == '+' || res.data[i][j] == '-' || res.data[i][j] == '|') {
							newMap[i].push(Wall);
						} else {
							newMap[i].push(Floor);
							if (i > 0) {
								if (newMap[i-1][newMap[i].length-1] === Wall) {
									newMap[i-1][newMap[i].length-1] = Wall2;
								}
							}
						}

						if (res.data[i][j] == 'p') {
							newLink[i].push({backgroundImage: 'url(' +LinkFront+ ')'})
							this.setState({linkCoor:{x: j, y: i}})
						} else {
							newLink[i].push({});
						}

						prev = res.data[i][j];
					}
				}

				newMap[newMap.length-2][newMap.length-2] = Goal;
				this.setState({goalCoor: {x: newMap.length-2, y: newMap.length-2}})

				// console.log(newMap);

				let tempWidth = 0;
				for (let i = 0; i < newMap.length; i++) {
					tempRows += '32px ';
				}

				for (let i = 0; i < newMap[0].length; i++) {
					tempCols += '32px ';
					tempWidth += 32;
				}

				this.setState({
					map: newMap,
					templateRows: tempRows,
					templateColumns: tempCols,
					width: tempWidth,
					linkPos: newLink
				});
			})
			.catch(error => {
				console.log(error);
			})
	}

	handleClick(){
		this.getMaze();
	}

	handleWidthChange(event) {
		this.setState({w: event.target.value})
	}

	handleHeightChange(event) {
		this.setState({h: event.target.value})
	}

	handleKeyDown(event){
		// console.log(event.key);
		if (event.key == 'a' || event.key == 'ArrowLeft') {
			let x = this.state.linkCoor.x;
			let y = this.state.linkCoor.y;

			if (!(this.state.map[y][x-1] == Wall || this.state.map[y][x-1] == Wall2)) {
				let tempLinkPos = this.state.linkPos;

				tempLinkPos[y][x] = {};
				tempLinkPos[y][x-1] = {backgroundImage: 'url(' +LinkLeft+ ')'};
				this.setState({
					linkPos: tempLinkPos,
					linkCoor: {x: x-1, y: y}
				});

				setTimeout(() => {
					if (this.state.goalCoor.x == x-1 && this.state.goalCoor.y == y) {
						alert("You've reached the goal!!!")
					}
				}, 10)
			}
		} else if (event.key == 's' || event.key == 'ArrowDown') {
			let x = this.state.linkCoor.x;
			let y = this.state.linkCoor.y;

			if (!(this.state.map[y+1][x] == Wall || this.state.map[y+1][x] == Wall2)) {
				let tempLinkPos = this.state.linkPos;

				tempLinkPos[y][x] = {};
				tempLinkPos[y+1][x] = {backgroundImage: 'url(' +LinkFront+ ')'};
				this.setState({
					linkPos: tempLinkPos,
					linkCoor: {x: x, y: y+1}
				});
				setTimeout(() => {
					if (this.state.goalCoor.x == x && this.state.goalCoor.y == y+1) {
						alert("You've reached the goal!!!")
					}
				}, 10)
			}
		} else if (event.key == 'd' || event.key == 'ArrowRight') {
			let x = this.state.linkCoor.x;
			let y = this.state.linkCoor.y;

			if (!(this.state.map[y][x+1] == Wall || this.state.map[y][x+1] == Wall2)) {
				let tempLinkPos = this.state.linkPos;

				tempLinkPos[y][x] = {};
				tempLinkPos[y][x+1] = {backgroundImage: 'url(' +LinkRight+ ')'};
				this.setState({
					linkPos: tempLinkPos,
					linkCoor: {x: x+1, y: y}
				});
				setTimeout(() => {
					if (this.state.goalCoor.x == x+1 && this.state.goalCoor.y == y) {
						alert("You've reached the goal!!!")
					}
				}, 10)
			}
		} else if (event.key == 'w' || event.key == 'ArrowUp') {
			let x = this.state.linkCoor.x;
			let y = this.state.linkCoor.y;

			if (!(this.state.map[y-1][x] == Wall || this.state.map[y-1][x] == Wall2)) {
				let tempLinkPos = this.state.linkPos;

				tempLinkPos[y][x] = {};
				tempLinkPos[y-1][x] = {backgroundImage: 'url(' +LinkBack+ ')'};
				this.setState({
					linkPos: tempLinkPos,
					linkCoor: {x: x, y: y-1}
				});
				setTimeout(() => {
					if (this.state.goalCoor.x == x && this.state.goalCoor.y == y-1) {
						alert("You've reached the goal!!!")
					}
				}, 10)
			}
		}
	}


	render(){
		const gridStyle = {
			position: 'absolute',
			display: 'grid',
			gridTemplateRows: this.state.templateRows,
			gridTemplateColumns: this.state.templateColumns,
			gridGap: '0px',
			margin: '0px 15px 15px 15px',
			width: this.state.width,
			marginLeft: -(this.state.width * 0.5),
			left: '50%'
		}
		return (
			<div className = "mainDiv" >
				<div className = "header">
					<div className = "title"> Maze </div>
				</div>
				<div className = "inputTitles">
					<label className = "labels">Width</label>
					<label className = "labels">Height</label>
				</div>
				<div className = "inputBox">
					<input placeholder = "width" className = "edit" value = {this.state.w} onChange = {this.handleWidthChange.bind(this)}/>
					<input placeholder = "height" className = "edit" value = {this.state.h} onChange = {this.handleHeightChange.bind(this)}/>
					<input type = "button" value = "Go" className = "button" onClick = {this.handleClick.bind(this)}/>
				</div>
				<div onKeyDown={this.handleKeyDown.bind(this)} tabIndex="0" autoFocus>
					<div style = {gridStyle} ref={(div) => {this.maze = div;}}>
						{
							this.state.map.map((row)=>{
								return (
									row.map((col)=>{
										return (
											<div style = {{backgroundImage: 'url(' +col+ ')'}}>
											</div>
										)
									})
								)
							})
						}
					</div>
					<div style = {gridStyle}>
						{
							this.state.linkPos.map((row)=>{
								return (
									row.map((col)=>{
										return (
											<div style = {col}>
											</div>
										)
									})
								)
							})
						}
					</div>
				</div>
			</div>
		)
	}
}

ReactDom.render(
	<Board />,
	document.getElementById('root')
)
