var friends = require("../data/friends");

module.exports = function(app) {
  // All friends 
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    // user information
    var user = req.body;
    var newFriend;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    //result will be the user with minimum difference 
    var minDifference = 100;
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        totalDifference += Math.abs(user.scores[j] - friends[i].scores[j]);
      }

      // change the newFriend index and set the new minimum if needed
      if(totalDifference < minDifference) {
       newFriend = friends[i];
        minDifference = totalDifference;
        console.log(totalDifference)
      }
    }

    // Add user to friends array
    friends.push(user);

    // send back friend match
    res.send(newFriend);
    console.log(newFriend)
  });
};