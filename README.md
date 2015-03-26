# musikata.kabuki

*Note: this project is very much in flux!*

Kabuki is Musikata's platform for presenting musical lessons.

The goal is to feed in a script for a lesson, and get out a beautiful lesson with interactive media that can be viewed on the web.

It's inspired by visual novel engines like [Ren'Py](http://www.renpy.org/) and [Twine](http://twinery.org/). 


## Why the Name 'Kabuki'?
Kabuki is a classical Japanese dance-drama. Check out the [wikipedia page](http://en.wikipedia.org/wiki/Kabuki)!

In many ways, we're presenting musical lessons on a stage. So it's a good analogy, that fits with our theme.

And in addition, the individual characters of Kabuki mean 'sing', 'dance', and 'skill'. This is a nifty coincidence. We like it.

## Why Roll Our Own Platform? Why Not Just Use Twine?
Digital music lessons have certain requirements that are hard to satisfy in existing tools like Ren'Py and Twine. Some of these requirements include:
- coordinating visual animations with background beats
- presenting and evaluating interactive exercises
- integrating with student progress tracking systems

These things are hard to do in Ren'Py and Twine. It may well take more effort to customize an existing tool, than to build one from scratch that does exactly what we want.

Working on our own tool will also help us appreciate the challenges of designing online music education. One of our goals is to help advance music education in general. So the more insight we gain, the more we can improve things.

Plus, it's fun to think about how we build it!

## General Architecture
*Very much in flux...*

The main idea of Kabuki is to provide a stage on which to present lessons that use visual and audio media.

Think about a real stage in a theatre. With a real stage, you can do things like turn the spotlights on or off, play background music, or send announcements over the public address system.

### Scripts
A play writer could write a script like this:

````
(Fade in the spotlights on stage left.)

Female lead: Meatloaf?! Again? What is the point of it all?

Male lead: I'm a veterinarian, not a cook, dammit! What do you expect?!

Cow lead: "Mooo!"

(Spotlight on cow)
...
````

Looks like we're not going to win a Tony anytime soon, eh? But you get the idea.

Similarly, a musical education lesson designer could write a script like this:

````
Spirit guide: Today we're going to learn about duple macrobeats.
(Start duple beat playing at 100 BPM)
Spirit guide: Let your body move to the beat. Look at how I dance...
(start spirit guide dancing)
````

This approach of scripting can be helpful for curriculum design because education specialists can write scripts, without having to know the technical details needed to make them work online. This can lead to more collaborations on music education curricula. Which would be cool.

### Stage Regions & Capabilities
The stage can be thought of as having various regions and capabilities.

For example, our stage might be divided like this on the screen:

````
|--------|
| Text   |
| Visual |
|        |
| Music  |
|--------|

````
Each region has a name like 'Text' or 'Visual'. 

There are also several 'backstage' regions, which aren't visible on the screen. But they're important too, as we'll soon see....

A stage also has capabilities, like playing sounds or showing text. Somethings happen on the stage, like showing pictures and showing text. Some things happen off stage that can't be seen (remember those backstage regions?), like playing sounds.

We can write scripts that take advantage of whatever capabilities our stage provides.

This is a bit like the lego block idea: from a few small pieces, we can build up big things.

### Extension Architecture
What if we want something to happen in our script that our stage can't do?  For example, what if we want to have fog in our play, but our stage doesn't have a built-in smoke machine? We bring in our own machine!

Similarly, Kabuki should be designed so that it can be extended. For example, for showing special visualizations, or playing special sounds. We shouldn't have to know ahead of time all the thigns that every script will need to do.

In addition, an extension-style architecture will let us build Kabuki up in pieces. We can start with the simple pieces, like showing text, build some scripts with those pieces, and see how it works.

This will let us iterate and learn more quickly.

## IN PROGRESS
That's what we've got for now. Just some ideas! But coding is on the way...
