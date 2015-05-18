(function() {
  var app = angular.module('twitcher', []);

  app.controller('TabController', function() {
    this.tab = 1;

    this.isSelected = function(tabNumber) {
      return this.tab === tabNumber;
    };

    this.selectTab = function(tabNumber) {
    	this.tab = tabNumber;
    };
  });

  app.controller('ListController', ['$http', function($http) {
  	var list = this;
    list.searchTerm = "";
  	list.allUsers = [];
  	list.onlineUsers = [];
  	list.offlineUsers = [];

  	for (var i=0; i < userNames.length; i++) {
      (function(i) {
        var user = {};
        $http.jsonp(url + userNames[i] + cb).success(function(data) {
          if (data.stream === null) {
            // if the channel is offline, make the default
            // user object and add to offlineUsers
            user.streaming = false;
            user.name = userNames[i];
            user.logo = "http://placehold.it/70/000/fff&text=OFFLINE"
            list.offlineUsers.push(user);
          }
          else {
            // if channel is online, fill user object with
            // neccessary info and add to onlineUsers
            user.streaming = true;
            user.name = data.stream.channel.display_name;
            user.logo = data.stream.channel.logo;
            user.status = data.stream.channel.status;
            list.onlineUsers.push(user);
          }
          // add the user object to the list allUsers
          list.allUsers.push(user);

        }).error(function(err) {
          console.warn(err);
        });
      })(i);
    };
  
  }]);

  var userNames = ["BeyondTheSummit", "FreeCodeCamp",
  "terakilobyte","purgegamers", "JoshOG", "Starladder1", "MedryBW"];

  var url = 'https://api.twitch.tv/kraken/streams/';
  var cb = '?callback=JSON_CALLBACK';

})();