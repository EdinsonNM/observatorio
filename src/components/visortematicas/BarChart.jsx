import React, {PropTypes} from 'react';

const style20p = {'width': '20%'};
const style10p = {'width': '10%'};

export default class BarChart extends React.Component {

	constructor(props) {
		super(props);


		let data = this.prepareData(this.props.data);
		let maxValue = data && data.length ? data[data.length - 1].cantidad : 0;

		this.state = {
			data,
			maxValue
		};
	}

	prepareData (originalData) {
		if (originalData && originalData.length) {
			let total = originalData.map(obj => obj.cantidad).reduce((total, elem) => total + elem);
			let data = originalData
			.sort((a, b) => b.cantidad - a.cantidad)
			.map(obj => {
				return {
					cantidad: obj.cantidad,
					investigador: obj.investigador,
					porcentaje: Math.round(1000*obj.cantidad/total) / 10 // Redondeado a 1 decimal :D
				};
			});

			console.log('data es: ');
			console.dir(data);

			return data;
		}

		return [];

	}


	buildRuler (maxValue) {

		return (
			<div className="ruler">
				<span style={style10p}>0</span>
				<span style={style20p}>{maxValue * 1/5}</span>
				<span style={style20p}>{maxValue * 2/5}</span>
				<span style={style20p}>{maxValue * 3/5}</span>
				<span style={style20p}>{maxValue * 4/5}</span>
				<span style={style10p}>{maxValue}</span>
			</div>
		);
	}

	buildVRuler () {
		return (
			<div className="vruler">
				<span style={style20p}></span>
				<span style={style20p}></span>
				<span style={style20p}></span>
				<span style={style20p}></span>
				<span style={style20p}></span>
			</div>
		);
	}

	buildRows (data) {
		let rows = data.map((obj, idx) => {
			return (
				<div className="row" key={`row-${idx}`}>
					<div className="cell label"><span>{obj.investigador}</span></div>
					<div className="cell dashed">
						<div className="bar" style={{width: `${obj.porcentaje}px`}}>
							<div className="tooltip">{obj.cantidad} Investigadores</div>
						</div>
					</div>
				</div>
			);
		});
		return rows;
	}

	buildChart (data, maxValue) {
		return (
			<div className="border">
				<h4 className="title"></h4>
				<div className="table">
					<div className="row">
						<div className="cell label no-border"></div>
						<div className="cell no-border">
							{this.buildRuler(maxValue)}
							{this.buildVRuler()}
						</div>
					</div>

					{this.buildRows(data)}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="bar-chart">
			{
				this.props.data && this.props.data.length
				? this.buildChart(this.state.data, this.state.maxValue)
				: <div>No hay datos!</div>
				}
			</div>
		);
	}
}

BarChart.propTypes = {
	data: PropTypes.array
};
