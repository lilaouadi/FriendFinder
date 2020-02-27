// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friend");

//commenting

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    }
    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;

    for (let i = 0; i < friendsData.length; i++) {
      var currentFriend = friendsData[i];
      totalDifference = 0;
      for (let j = 0; j < currentFriend.scores.length; j++) {
        const currentFriendScore = currentFriend.scores[j]
        const currentUserScore = userScores[j]
        totalDifference += Math.abs(parseInt(currentFriendScore) - parseInt(currentUserScore));
      }
      if(totalDifference <= bestMatch.friendDifference){
        bestMatch.name = currentFriend.name;
        bestMatch.photo  = currentFriend.photo;
        bestMatch.friendDifference = totalDifference
      }
      
    }
    friendsData.push(userData);
    res.json(bestMatch)

  });

};
