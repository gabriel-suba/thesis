require("dotenv").config()

const ort = require('onnxruntime-node');
const express = require('express')
const cors = require('cors')

const scaleOut = require('./scalers')

const app = express()

app.use(express.json())
app.use(cors())

// routes
app.get('/', (req, res) => {
	res.send('hello world')
})

app.get('/predict/:area', async (req, res) => {
	// create inference session
	var session = await ort.InferenceSession.create('./model/main_model.onnx')

	// convert url parameters to float
	var x = parseFloat(req.params.area)

	// normalize the inputs
	var x_arr = new Array(8).fill((x - 200) / (2000 - 200))

	// convert data array to tensor
	var x_tensor = new ort.Tensor('float32', x_arr, [1, 8])
	
	// create feed object
	var feeds = { actual_input: x_tensor }

	// run forward pass
	var results = await session.run(feeds)

	// get the output
	var output = results.output.data

	// scale the output
	var output_s = scaleOut(output)

	res.json(output_s)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))