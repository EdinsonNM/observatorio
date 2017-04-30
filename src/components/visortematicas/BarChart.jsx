import React, {PropTypes} from 'react';

const style20p = {'width': '20%'};
const style10p = {'width': '10%'};

export default class BarChart extends React.Component {

	constructor(props) {
		super(props);


		let total = this.props.data.length ? this.props.data.map(obj => obj.cantidad).reduce((total, elem) => total + elem) : 0;
		let data = this.prepareData(this.props.data, total);
		let maxValue = data && data.length ? data[0].cantidad : 0;

		this.state = {
			data,
			total,
			maxValue
		};
	}

	prepareData (originalData, total) {
		if (originalData && originalData.length) {

			let data = originalData
			.sort((a, b) => b.cantidad - a.cantidad)
			.map(obj => {
				return {
					cantidad: obj.cantidad,
					investigador: obj.investigador,
					porcentaje: Math.round(1000 * obj.cantidad/total) / 10 // Redondeado a 1 decimal :D
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
		const maxPercent = this.state.maxValue * 100 / this.state.total;
		let rows = data.map((obj, idx) => {
			let barPercent = Math.round (obj.porcentaje * 100 / maxPercent);

			return (
				<div className="row" key={`row-${idx}`}>
					<div className="cell label"><span>{obj.investigador}</span></div>
					<div className="cell dashed">
						<div className="bar" style={{'width': `${barPercent}%`}}>
							<div className="tooltip">{obj.cantidad} Investigadores ({obj.porcentaje}%)</div>
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

BarChart.propTypes = {data: PropTypes.array};
BarChart.defaultProps = {data: []};
