var path = require("path");
var friendsData = require("../data/friends");

module.exports = function(app) {

    app.post("/api/friends", function(req, res) {
        console.log(friendsData)
        console.log(req.body)

        let score = req.body.score
        let bestMatch
        let bestMatchScore = 0
        let currMatchScore = 0
        console.log('score ' + score)

        for (const key in friendsData) {
                const element = friendsData[key].score
                console.log('element ' + element)
                for(i = 0 ; i < 5 ; i++){
                    console.log('element[i] = ' +  element[i] + ' score[i] = ' + score[i])
                    currMatchScore+= (5 - Math.abs(element[i] - score[i]))
                }
                console.log('currScore is ' + currMatchScore)
                    //currMatchScore+= Math.abs(element2 - element)
                if(currMatchScore > bestMatchScore){
                    console.log('in here')
                    bestMatch = friendsData[key]
                    bestMatchScore = currMatchScore                 
                } 
                currMatchScore = 0
        }

        console.log('Bm '+ bestMatch)

        friendsData.push(req.body)
        res.send([bestMatch.name , bestMatchScore , bestMatch.photos])
    })

}
