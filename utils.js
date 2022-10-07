const normalizeX = (data) => {
	var max = 2000;
	var min = 200;

	return (data - min) / (max - min)
}

const normalizeY = (data) => {
	var max = 800;
	var min = 80;
	
	return (data - min) / (max - min)
}

const scaleUp = (data) => {
	var max = 800;
	var min = 80;

	return data * (max - min) + min;
}

const rawSequence = (multiplier) => {
	var arr = [];

	for (let i = 1; i <= 10; i++) {
		let x = i * 200;
		let y = x * multiplier;
		
		arr.push([ x, y ]);
	}

	return arr;
}

const splitSequence = (sequence) => {
	const x = []
	const y = []

	for (let i = 0; i < sequence.length; i++) {
		x.push([normalizeX(sequence[i][0])])
		y.push([normalizeY(sequence[i][1])])
	}

	return { x, y }
}

module.exports = {
	normalizeX,
	normalizeY,
	scaleUp,
	rawSequence,
	splitSequence
}