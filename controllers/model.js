const { HfInference } = require('@huggingface/inference');

const hf = new HfInference('HF_TOKEN');

exports.model = (req, res, next) => {
   // console.log("Working!");
    
    const ques = req.body;
    console.log(ques);

hf.questionAnswering({
    model: 'deepset/roberta-base-squad2',
    inputs: {
        question: ques.question, 
        context: 'if body temperature greater than 98 and less than 100 take one paracetamol tablet.if body temperature greater than 100 and less than 110 take two paracetamol tablets'
    }
}).then(result => {
        console.log(result);
        res.send(result);
        }
).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while processing the request' });
});
};
