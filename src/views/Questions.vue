<template>
  <v-container>
    <div style="position: relative;">
      <v-textarea
        v-model="displayedQuestion"
        variant="outlined"
        :readonly="true"
      />
      <v-icon
        icon="fa-solid fa-copy"
        style="position: absolute; bottom: 23px; right: 4px; margin: 10px;"
        @click="copyURL"
      />
    </div>
    <v-btn class="mt-3" variant="outlined" @click="getQuestion()">Get Random Question</v-btn>
  </v-container>
  <v-snackbar v-model="copyToast" :timeout="1000" color="green">
    Copy Successful!
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    displayedQuestion: '',
    copyToast: false,
    questions: [
    "What have you created that you are most proud of?", 
    "What's the best thing you got from one of your parents?", 
    "What bends your mind every time you think about it?", 
    "In your group of friends, what role do you play?", 
    "What incredibly strong opinion do you have that is completely unimportant in the grand scheme of things?", 
    "What's your favorite piece of clothing you own?",
    "What fictional place would you most like to go to?", 
    "What's one place you've travelled that you never want to go back to?", 
    "When people come to you for help, what do they usually want help with?", 
    "What are you interested in that most people haven't heard of?", 
    "Mountains or ocean?",
    "What was your best birthday?", 
    "Pizza or tacos?",
    "Favorite pizza topping?",
    "What's the story behind one of your scars?",
    "Pancakes or waffles?", 
    "Pirates or ninjas?",
    "What was the best compliment you've ever received?",
    "If you lost all of your possessions but one, what would you want it to be?", 
    "Who inspires you to be better?", 
    "What dumb accomplishment are you most proud of?", 
    "When was the last time you changed your opinion about something major?",  
    "What is something you can never seem to finish?",
    "What is one of your favorite smells?", 
    "If you had to change your name, what would you change it to?", 
    "What are you a natural at?", 
    "What do you like most about your family?",
    "Have you ever saved someone's life?",
    "What's an unpopular opinion you have?", 
    "Who is one of your best friends, and what do you love about them?",
    "Do you have any nicknames?",
    "What's one of your favorite comfort foods?",
    "What is your theme song?",
    "What is one of the great values that guides your life?",
    "What's your favorite book?",
    "What's the last book you gave up on and stopped reading?",
    "What's the worst movie you've ever seen?",
    "What issue will you always speak your mind about?",
    "What would you do on a free afternoon in the middle of the week?",
    "Pet peeves?",
    "What's the best piece of advice you ever received?",
    "Who was your favorite teacher and why?",
    "If you could have any superpower, what would it be and why?",
    "What's on your bucket list this year?",
    "If you could live in a book, TV show, or movie, what would it be?",
    "What languages do you speak?",
    "Would you rather be stuck on a broken ski lift or a broken elevator?",
    "If you were a vegetable, what vegetable would you be?",
    "What makes you cry?",
    "Who are some of your heroes?",
    "What's something you wish you'd figured out sooner?",
    "What's your favorite candy?",
    "What's your worst habit?",
    "Favorite city?",
    "Do you ever sing when you're alone? What songs?",
    "What's your earliest memory?",
    "What's something you learned in the last week?",
    "What story does your family always tell about you?",
    "What talent would you show off in a talent show?",
    "What's something you've always wanted to try but haven't had the chance?",
    "What was the most defining moment in your life so far?",
    "What was the biggest challenge you faced this year?",
    "What's the most romantic gesture you've ever made or received?",
    "What are you most passionate about in life?",
    "What's one thing you wish you could tell your younger self?",
    "What's the most important lesson you've learned in a past relationship?",
    "What's something that you're afraid of but want to overcome?",
    "What's the best compliment you've ever received?",
    "What's the biggest risk you've taken in your life so far?",
    "What's something that you've never told anyone before?",
    "What's your biggest regret in life?",
    "What's one thing that you would change about yourself if you could?",
    "What's your biggest fear for the future?",
    "What's one of the most important lessons your parents taught you?",
    "What's one thing you've always wanted to ask me?",
    "What's the best advice you've ever received?",
    "What's something you wish more people knew about you?",
    "What's one thing that you're incredibly proud of?",
    "What's the biggest misconception people have about you?",
    "What's the most important thing you look for in a partner?",
    "What's something you're currently struggling with?",
    "What's one thing that you want to achieve in the next year?",
    "What's the best birthday you've ever had?",
    "What's one of the most important life lessons you've learned?",
    "What's one thing that you do that makes you feel truly alive?",
    "What's the most meaningful gift you've ever received?",
    "What's your favorite memory from your childhood?",
    "What's something you've recently learned about yourself?",
    "What's one thing that you've always wanted to do but haven't had the chance?",
    "What's the best vacation you've ever taken?",
    "What's the most spontaneous thing you've ever done?",
    "What's one thing that always puts a smile on your face?",
    "What's something that you're proud of but never get to talk about?",
    "What's the biggest mistake you've ever made and what did you learn from it?",
    "What's something that you're looking forward to in the future?",
    "What's one thing that you wish you had more time for?",
    "What's the most interesting place you've ever been?",
    "What's the most important thing you've learned about yourself this year?",
    "What's something that you're currently working on improving?",
    "What's the biggest challenge you've overcome so far?",
    "What's one thing you wish you could change about the world?",
    "What's something you're excited about for the upcoming year?",
    "What's one thing you've always wanted to learn?",
    "What's something you've accomplished that you're particularly proud of?",
    "What's the most meaningful experience you've had in the past year?",
    "What's one thing that you're most grateful for?",
    "What's something that always makes you feel better when you're having a bad day?",
    "What's the most valuable thing you've learned from a past relationship?",
    "What is your love language?",
    "What's the biggest risk you've ever taken in your life?",
    "Would you rather be able to talk to animals or speak all foreign languages?",
    "Would you rather have the power of flight or the power of invisibility?",
    "Would you rather live in a world with superheroes or a world of magic?",
    "Would you rather have the ability to read minds or the ability to teleport?",
    "Would you rather be able to breathe underwater or have the ability to withstand extreme temperatures?",
    "Would you rather have unlimited sushi for life or unlimited tacos for life?",
    "Would you rather be stranded on a deserted island alone or with someone you don't like?",
    "Would you rather be able to time travel or have the power to pause time?",
    "Would you rather be able to talk your way out of any situation or have the ability to never get lost?",
    "Would you rather be able to fly like Superman or have super strength like the Hulk?",
    "Would you rather fight a horse-sized duck or 100 duck-sized horses?",
    "Coffee or tea?",
    "Cat or dog?",
    "Summer or winter?",
    "City or countryside?",
    "Books or movies?",
    "Sweet or salty?",
    "Phone call or text message?",
    "Morning or night?",
    "Rain or snow?",
    "Cake or pie?",
    "Truth or dare?",
    "Indoors or outdoors?",
    "Classical music or rock music?",
    "Gym or outdoor sports?",
    "Swimming or hiking?",
    "Car or motorcycle?",
    "Red wine or white wine?",
    "Dine in or take out?",
    "Early bird or night owl?",
    "Singing or dancing?",
    "What is your favorite breakfase cereal?",
    "Giraffes... too tall?",
    "Who is your favorite superhero?"
  ]
  }),
  mounted() {
    this.getQuestion()
  },
  methods: {
    getQuestion() {
      this.displayedQuestion = this.questions[Math.floor(Math.random()*this.questions.length)]
    },
    copyURL() {
      navigator.clipboard.writeText(this.displayedQuestion);
      this.copyToast = true
    },
  }
}
</script>

<style>
  .v-textarea .v-field--active {
    font-size: 28px;
  }
</style>