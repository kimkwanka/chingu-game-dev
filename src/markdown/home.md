---
imports:
  CheckBox: '../components/CheckBox.js'
---
# Welcome to LEVEL 0 of the ChinguGameDev project...

![Hurdle](/assets/1.jpg)

### ... and congratulations on overcoming the first hurdle (=logging in) on your journey to create the best game in the universe!

But since you are a clever one you already knew that this was only the beginning...

Remember that this is a cross-cohort team project and it is very likely that you ended up with people from totally different cohorts. That means
that prior experience and skill levels might vary quite a bit between you and your team members - each team was balanced around this fact though.

The challenge of this project is therefore not only to create a super slick game but to make sure that you do so together with your team. Just like
in real life you will always encounter people who have a different experience / skill level from you - successfully dealing with those differences in a team
setting is a valuable key soft skill to learn.

[Here are 8 Tips for Chingu's Build-to-Learn Projects](https://medium.com/chingu/10-tips-for-chingus-build-to-learn-projects-59fd940bc8cf) that should get you into the right mindset.

Because of the experience and skill variance, don't be shocked if this page might tell you stuff you already know at times (in which case you can (naturally) safely ignore those parts) or wants you to do stuff that you have never even heard of before. It's all part of the master plan!

### 0. What the hell are those channels?
When the project started you got invited into 2 private slack channels: Your team's channel and the "free for all" channel. Unlike your team's channel
which is reserved for you and your team only, the "free for all" channel is meant for all teams to talk in. Feel free to post questions there if you get
stuck or just chat casually about anything really.

In case of a problem so epic in proportions that you can't sort it out by talking to your team and / or the other teams you can message me, **@kimkwanka** for help.

```render html
<CheckBox id="learnedTheBasics" label="Learned about the basics" category="Project Setup"/>
```
Now, that you know the basics, let's look at the next steps:


### 1. Meet your team / Project Setup

![Meet the team](/assets/2.jpg)

I can smell that you are eager to start hacking away at your keyboard but since this is a team project there are a few things you should do first:

#### a) Chat with your team mates
Not only does chatting burn 0.001 calories per word, but it also let's you get to know the other members of your team a lot better than staring
at their username and wondering what they would be like.
So don't be shy, introduce yourself, tell them about your favorite Pokemon or even show them the photo of that one time you forgot to take off your
bunny ear hat in public.

```render html
<CheckBox id="hadTeamChat" label="Had a chat with the team" category="Project Setup"/>
```
#### b) Coordinate the first project meeting
Now that the proverbial ice is broken, you can either have your first meeting right away or coordinate a suitable time for having it later.

If you need help finding the right time for the meeting you can try to use the [Timed-UP](https://timedupchingu.herokuapp.com/) tool which crunches all team member's
timezones and (depending on the "free time" everyone has set up) spits out a timespan when everyone will be available.
```render html
<CheckBox id="coordinatedFirstMeeting" label="Coordinated the first meeting" category="Project Setup"/>
```
> Experience has shown that having that meeting as soon as possible increases the chances of success by a ton - so don't put it off for too long
!
#### c) The first project meeting
That first meeting will present you with your biggest creative challenge yet: Picking a team name!
##### Nomen est omen
Since your team's official name is still something like 'game-dev-team-37' brainstorm a little and decide together on a new sexy name like "Strawberry Muffin Knights".
```render html
<CheckBox id="pickedTeamName" label="Picked a new team name" category="Project Setup"/>
```
### d) It's a cat, it's an octopus, it's a Github? O_o

![Octopus Cat](/assets/3.jpg)

Now that you got your shiny new name I can see that you want to start already - and I can feel you! But hold on, cowboy! This is a team effort, so we need a way for you and your
team members to collaborate. Sending files around by mail or using a shared dropbox folder will only get you so far in this endeavour, so it is highly recommended, if not expected,
for you and your mates to use git via [Github](https://github.com) for that.

"What the funk is a git or a Github even?" you might ask, in which case I'd point you to [this interactive tutorial](https://try.github.io/levels/1/challenges/1). If you already know the deal
, be sure to help out your team members if they're struggling.

In any case though, set up a new Github repo for your Super Mario Clone - and don't worry, there doesn't need to be any code in there yet, but make sure to at least add a README.

```render html
<CheckBox id="setupRepo" label="Set up Github repo with a README" category="Project Setup"/>
```

> The soft due date for all above steps is 2-4 days total!

### 2. Finally we get to code!
The foundation is laid - it's time to code... More specifically time to code with the "Canvas"!

#### a) Canvas? I didn't think I'd need a brush here...
To get everyone onto the same page we won't use Phaser.io just yet, but instead use the "Canvas" to create the Super Mario Clone!

The "Canvas" is just a fancy name for an HTML5 element that let's you draw basically anything on it. That's exactly what we need - what a nice coincidence!
Like a literal "blank canvas", the "Canvas" element differs from other elements in that it is indeed completely blank at the start. It's just a rectangular area on your website, which you can
draw on using Javascript. You can think of it as your "screen" where all the things like the player, the enemies, projectiles, items, etc. would be painted to.

If you need a refresher or have never actually used the canvas before, [here's a nice canvas game tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript) for you!

```render html
<CheckBox id="learnedCanvas" label="Learned about the Canvas" category="Project Planning"/>
```

#### b) Deconstruct the plumber!
![Plumber](/assets/4.jpg)
Now that you are somewhat familiar with the canvas you have basically everything you need to succeed, so it's time to break down Super Mario into bite-sized pieces:

Take a look at [this simple mario game](http://codepen.io/harsay/full/gMOZrB) and then [this video](https://www.youtube.com/watch?v=ZH2wGpEZVgE) explaining the design of the first level of Super Mario Bros in great detail.
While playing / watching - try to think about what the core features and elements of Super Mario Bros really are. What are the things that are absolutely necessary and which things can be left out?

Now create a list with those essential features and break them down into "actionable components" like user stories. 
(Try to limit yourself to the bare minimum for now!)

Here's a few example user stories to get you started:

1. I can press a key to make Mario move to the left 
2. I can press a key to make Mario move to the right
3. I can press a key to make Mario jump up
4. ...

```render html
<CheckBox id="createdTasks" label="Created task / feature list" category="Project Planning"/>
```

With that fancy list you can easily assign those tasks to each individual team member - just make sure to set "soft due dates" by when those tasks should be finished.

[Trello](https://trello.com/) is great for this kind of stuff but if you want you can go "oldschool" too and just create a [post with a checklist in slack](https://medium.com/r/?url=http%3A%2F%2FCreate%20a%20post%20with%20a%20checklist) and pin that to your team's slack channel.

```render html
<CheckBox id="assignedTasks" label="Assigned tasks to team members" category="Project Planning"/>
```
```render html
<CheckBox id="dueDates" label="Set soft due dates for the tasks" category="Project Planning"/>
```

> The soft due date for the above steps is 5-7 days total!

### 3. Let the Clone Wars begin!
![Clone](/assets/5.jpg)
With all the prepaprations and planning out of the way, the juicy part of the project is about to begin. We'll create our own Super Mario Clone! 

This is the most tricky part of it all - not only will it test your coding skills but also your ability to collaborate with your team.
Coordinating the team and making sure it all works together is where the real difficulty will lie so prepare for a (somewhat) rough ride.
But seeing how far you have already come, I know you got it in you, Morpheus was right!

And remember, if your team gets stuck be sure to ask the other teams, me or even the people in ChinguCentral for help and advice.


So stay strong and finish that Super Mario Clone - see you on LEVEL 1 "The Game" soon!

If you have finished your game in it's most basic form, be sure to deploy it to [surge.sh](https://surge.sh) for everyone to play!

```render html
<CheckBox id="cloneFinished" label="Finished Super Mario Clone" category="Project Execution"/>
```

```render html
<CheckBox id="cloneDeployed" label="Deployed it to surge.sh" category="Project Execution"/>
```

> The soft due date for creating the Super Mario Clone is 14-21 days!