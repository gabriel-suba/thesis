function generateData(start, interval) {
	const materials = {
		cement: [],
		sand: [],
		gravel: [],
		steel: [],
		paint: [],
		bricks: [],
		flooring: [],
		rough: [],
		standard: [],
		highend: []
	}

	let i = start

	while (i <= 2000) {
		materials.cement.push(i * 0.4)
		materials.sand.push(i * 0.816)
		materials.gravel.push(i * 0.608)
		materials.steel.push(i * 4.0)
		materials.paint.push(i * 0.18)
		materials.bricks.push(i * 8)
		materials.flooring.push(i * 1.3)
		materials.rough.push((i / 10.764) * 23000)
		materials.standard.push((i / 10.764) * 30000)
		materials.highend.push((i / 10.764) * 40000)

		i += interval
	}

	return materials
}

function inverseTransform(fittedArr, y) {
	var min = Math.min(...fittedArr)
	var max = Math.max(...fittedArr)

	return y * (max - min) + min
}

function scaleOut(arr) {
	const out = {
		cement: 0,
		sand: 0,
		gravel: 0,
		steel: 0,
		paint: 0,
		bricks: 0,
		flooring: 0,
		rough: 0,
		standard: 0,
		highend: 0,
	}
	
	const data = generateData(200, 200) // for normalization
	
	out.cement = inverseTransform(data.cement, arr[0])
	out.sand = inverseTransform(data.sand, arr[1])
	out.gravel = inverseTransform(data.gravel, arr[2])
	out.steel = inverseTransform(data.steel, arr[3])
	out.paint = inverseTransform(data.paint, arr[4])
	out.bricks = inverseTransform(data.bricks, arr[5])
	out.flooring = inverseTransform(data.flooring, arr[6])
	out.rough = inverseTransform(data.rough, arr[7])
	out.standard = inverseTransform(data.standard, arr[7])
	out.highend = inverseTransform(data.highend, arr[7])

	return out
}

module.exports = scaleOut