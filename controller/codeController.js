const CodeHistory = require("../model/codeHistory");

const saveHistory = async(req, res) => {

    const {sessionId, hostId, code} = req.body;
    const {id } = req.user;
    // console.log(req, sessionId, hostId, code, id)
    try{

        const history = await CodeHistory.findOne({sessionId : sessionId});
        if(history){

            const newHistory = {

                code: code,
                savedBy: id,
                savedAt: Date.now()
            }

            // if the history array has more than 20 documents
            if(history.codeSnippets.length>=20)
                history.codeSnippets.shift();

            history.codeSnippets.push(newHistory);
            await history.save();
            return res.status(200).send({message: "History updated successfully", history : history});
        }

        const newHistory = new CodeHistory(
            {
                hostId: hostId, 
                sessionId: sessionId, 
                codeSnippets : {
                    code: code,
                    savedBy: id,
                    savedAt: Date.now()
                }
            })
        
        await newHistory.save();
        res.status(200).send({message: "History saved successfully", history : newHistory});

    }catch(err){

        console.log(err);
        res.status(500).send({message: "Something went wrong", error: err});
    }
   

}

const getLastCheckPoint = async(req, res) => {

    const {sessionId} = req.body;
    // console.log("sessionId",sessionId);
    try {
        
        const history = await CodeHistory.findOne({sessionId});
        if(!history){

            return res.status(202).send({});
        }

        const result = history.codeSnippets[history.codeSnippets.length -1];

        res.status(200).send({lastCheckpoint: result});


    } catch (error) {
        
        console.log(error);
        res.status(500).send({message: "something went wrong", error : error});
    }
}
module.exports = {saveHistory, getLastCheckPoint}