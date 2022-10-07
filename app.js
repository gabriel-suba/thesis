require("dotenv").config()

const ort = require('onnxruntime-node');
const express = require('express')
const cors = require('cors')

const app = express()
const utils = require('./utils')

app.use(express.json())
app.use(cors())

// routes
app.get('/', (req, res) => {
	res.send('hello world')
})

app.get('/predict/:area', async (req, res) => {
	// create inference session
	const session = await ort.InferenceSession.create('./model/single_lstm-new.onnx')

	// convert url parameters to float
	const area = parseFloat(req.params.area)

	// normalize the input
	const normArea = (area - 200) / (2000 - 200)

	// store to an array
	const data = [[normArea]]

	// convert data array to tensor
	const tensorData = new ort.Tensor('float32', data, [1, 1])
	
	// create feed object
	const feeds = { actual_input: tensorData }

	// run forward pass
	const results = await session.run(feeds)

	// get the output
	const output = results.output.data

	res.json({ result: output[0] })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))