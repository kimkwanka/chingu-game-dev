# chingu-game-dev
Project Managment Site for the Chingu Game Dev Workshop

This app leads the participants through the different stages of the workshop and allows progress trackings of the individual team members
but also the teams as a whole. The synchronization of progress, team and member data (Redux store) is achieved via Socket.io.

Additionally, it tries to streamline scheduling meetings by providing a time zone conversion widget
that automatically converts a set time in accordance to the respective time zones of all team members.

## Built With
- React
- Redux
- MongoDB / Mongoose
- Express
- Node.js
- Socket.io

## Live Version
Check out the [live version](https://gamedev.kimkwanka.io/) to see the app in action.
The deployed version gives you access to the regular participant view ("My Team"), but also the admin view ("Overview" panel).

### NOTE
Since this app was built for a one-time game development workshop and heavily relies on its
integration with a Slack workspace that is since long gone, the live version sadly can't access the original
data and has to mock it instead. This should however, still suffice to get an idea of how the app was used.
