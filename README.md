There are a few dependencies. Please run the following command in the project folder once you have pulled it down:
* npm install
* npm install -g babel-cli tape faucet

Then run it using:
* npm start

To test:
* all test files should go in the 'tests' directory
* npm test

To deploy to quid.haikuthunder.com
* make sure you have the Firebase CLI installed (npm install -g firebase-tools)
* make sure you have the most up to date code (git pull)
* npm run deploy

To deploy with FTP:
* npm run build
* move contents of public directory to server


The logic of the lobbying game (Quid) is as follows:

You are a (corrupt) politician. In order to continue to get re-elected, you need money.

To earn money, you use your influence as a politician to do the bidding of your lobbyists.

On the 6 x 6 game board, place like objects together.
3 of any like objects that touch (must be adjacent, not diagonal) will combine into a more valuable object.
Oil drops become oil cans become derricks become refineries become pipelines. All of which means more money for you! And when you have enough highest-level objects (pipelines in the case of the oil lobby) on the board (you don't need to match those), you earn certain special favors that you can call in.

Unfortunately, the more successful you are, the more your constituents will get in your way.
They'll start filling up your grid, potentially even swarming.
If you don't deal with them, they'll clog your grid. Purchase appeasement tokens to placate them.

There's only so much time until your next election, and you gotta get that money.
As you survive each election, you'll discover some challengers are tougher than others,
which means they're throwing more money at you and you need more money to shout them down.
It's also going to cost more to move up to a higher office--incumbency has its advantages.
At certain points, you'll be given the option to move up to higher office or remain an incumbent.
Fortunately, most of the money is contributed to superPACs, so you don't have to worry about which cycle you've technically raised money in/for. It all just carries over.

The megaphone can also help. In lieu of actually getting stuff passed through legislation to give
your lobbyists what they want, sometimes speaking to their interests works just as well. Use a megaphone as a missing third object to help you combine two like objects into the next more valuable one.

As you gain a national office, more powerful lobbyists may take an interest in you,
which can be tough to juggle. Fortunately, Pork tokens can help. Pork used to be a way to sneak things into unrelated bills for your constituents. There's no reason you can't use it for your lobbyist friends, though. Place a Pork token on anything in your way, and any match you make that also touches the Pork token will free up that space.
