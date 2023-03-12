# Overview
Recreating the well known word game Wordle. I named it **Word Masters**.

* There is a secret five letter word chosen
* Players have six guesses to figure out the secret word. After six guesses, they lose
* If the player guesses a letter that is in the right place, it is shown as green
* If the player guesses a letter that is in the word but not in the right place, it is shown as yellow
* It does account for however many of the letter exist in the word. For example, if the player guesses "SPOOL" and the word is "OVERT", one "O" is shown as yellow and the second one is not.
* If the player guesses the right word, the player wins and the game is over.

# Demo
You can check the the demo of the game at this [link](https://pytholic-word-masters.vercel.app/).

# The API

<b>GET</b> https://words.dev-apis.com/word-of-the-day
<br>This gives the word of the day. It changes every night at midnight.

<b>POST</b> https://words.dev-apis.com/validate-word
<br>This endpoint is used to validate the word entered by the user.