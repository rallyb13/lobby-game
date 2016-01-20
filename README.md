There are a few dependencies. Please run the following commands in the project folder once you have pulled it down:
* npm install react react-dom --save
* npm install babel webpack webpack-dev-server
* npm install babel-loader babel-core babel-preset-es2015 babel-preset-react

Then run it using:
* npm start

To deploy with FTP:
* npm run build
* move index.html, index.js, and images dir to server


The logic of the lobbying game (Quid) is as follows:

You are a (corrupt) politician. In order to continue to get elected, you need money.

To earn money, you use your influence as a politician to do the bidding of your lobbyists.

On the 6 x 6 game board, place like objects together.
3 of any like objects that touch (must be adjacent, not diagonal) will combine into a more valuable object.
Oil drops become oil cans become derricks become refineries become pipelines. All of which means more money for you!

Unfortunately, the more successful you are, the more your constituents will get in your way.
They'll start appearing and filling up your grid, potentially even swarming.
If you don't deal with them, they'll clog your grid. (And this is where we get into what hasn't been built yet.) Of course, it costs time (moves) to placate them, so be careful.

There's only so much time until your next election, and you gotta get that money.
As you survive each election, you'll discover some challengers are tougher than others,
which means they're throwing more money at you and you need more money to shout them down.
It's also going to cost more to move up to a higher office--incumbancy has its advantages.
Fortunately, most of the money is contributed to superPACs, so you don't have to worry about which cycle you've technically raised money in/for. It all just carries over.

The megaphone can also help. In lieu of actually getting stuff passed through legislation to give
your lobbyists what they want, sometimes speaking to their interests works just as well. Use a megaphone as a missing third object to help you combine two like objects into the next more valuable one.

As you move to higher office, more powerful lobbyists may take an interest in you,
which can be tough to juggle. Fortunately, Pork tokens can help. Pork used to be a way to sneak things into unrelated bills for your constituents. There's no reason you can't use it for your lobbyist friends, though. Place a Pork token on anything in your way, and any match you make that also touches the Pork token will free up that space when the tokens are combined into the next object.
