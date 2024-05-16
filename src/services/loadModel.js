const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    return tf.loadGraphModel('https://storage.googleapis.com/cancer_prediction_byattaf/model_prod/model.json');
}
module.exports = loadModel;