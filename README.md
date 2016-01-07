There are a few dependencies. Please run the following commands in the project folder once you have pulled it down:
npm install react react-dom --save
npm install babel webpack webpack-dev-server
npm install babel-loader babel-core babel-preset-es2015 babel-preset-react

Then run it using:
npm start


The logic of the lobbying game (Quid) is as follows (most of this is not yet built out):

You are a (corrupt) politician. In order to continue to get elected, you need money.
To earn money, you use your influence as a politician to do the bidding of your lobbyists.
On the 6 x 6 game board, place like objects together.
3 of any like objects that touch will combine into a more valuable object.
Oil drops become derricks become refineries become...well, money (at least for you).
Unfortunately, the more successful you are, the more your constituents will get in your way.
They'll start appearing and filling up your grid, potentially even swarming.
If you don't deal with them by [first missing bit of game logic here], they'll clog your grid.
Of course, it costs time (moves) to placate them, so be careful.
There's only so much time until your next election, and you gotta have money.
As you survive each election, you'll discover some challengers are tougher than others,
Which means they're throwing more money at you and you need to pay more to shout them down.
It's also going to cost more to move up to a higher office--incumbancy has its advantages.
As you move to higher office, you deal with more issues at once, which can be tough to juggle.
Fortunately, Pork tokens can help. Pork used to be a way to sneak things into unrelated bills for your constituents.
There's no reason you can't use it for your lobbyist friends, though.
Place a Pork token on anything in your way, and any match you make that also touches the Pork token will free up that space when the tokens are combined into the next object.
