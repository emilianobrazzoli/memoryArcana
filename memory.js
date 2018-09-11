
		var delegate = require('./delegate.js');   
        
        var find = function(channelID) {
            var channel = delegate.findById(channelID);
            if (channel === null || channel.id === null || channel.id === undefined) {

                var toAdd = {
                    decks: [],
                    c: null,
                    t: null,
                    id: channelID
                }
                console.log('Add new channel');
                delegate.create(toAdd);
                return toAdd;
            } else {
                console.log('found '+channel.id);
                return channel;
            }

        }


        var getChannel = function(channelID) {
            return find(channelID);
        }

        var setChannel = function(channelID, channelToAdd) {
            try{
              var channel = delegate.findById(channelID);
              channel.desks=channelToAdd.desks;
              channel.t=channelToAdd.t;
              channel.c=channelToAdd.c;
              delegate.merge(channelID, channel);
              return channel;
            } catch(error) {
              console.log('Server findById error: ' + error);
              return false;
            };
        }

        module.exports = {
            getChannel: function(channelID) {
                return getChannel(channelID);
            },
            setChannel: function(channelID, channelToAdd) {
                return setChannel(channelID, channelToAdd);
            }
        }
