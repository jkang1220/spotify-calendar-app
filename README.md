# spotify-calendar-app

A calendar app for challenge 2 of the 2018 NYC Spotify Fellowship application

## Specs

1.  UI will render the current month on initial render
2.  No auth or user login was created.
3.  When a user clicks on a box, a form modal will appear allowing the user to create an event.
4.  The create event form has the following fields: start time, end time, description
5.  Selecting Submit on the event form will save the event in the DB and the form will dissapear
6.  Events appear in the correct day's box
7.  Events can span multiple days
8.  The calendar has Month, Week and Day Views.
9.  The user can switch between months, weeks and days using the buttons above the calendar.
10. Days with too many events will automatically have a scrollbar in it.
11. The user can update and delete events by clicking on an event and then seleting the update or delete buttons.
12. The UI should has 5 rows of 7 boxes with the correct date on the correct days.
13. The UI will alert the user and not save/update the event if:
    a. The event date is before the end start date
    b. The event description is empty

## Installation

Run the following command from the root directory to build the app locally.

```sh
$ npm run react-dev
$ npm run server-dev
```
