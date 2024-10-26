# Last One Out Loses

## Introduction

"Last One Out Loses" is a simple yet strategic game where a playing surface is covered with at least 20 items (sticks, coins, etc.). Two players take turns, and each may remove 1 to 3 items. The player who removes the final item loses the game.

## Game Mechanics

### Starting with 20 Pieces:

**Second Player’s Advantage:** If you start with 20 items, the second player can gain a significant advantage by following an optimal strategy.

#### Caveat

As the first player, no matter if you pick 1, 2, or 3 pieces, the second player can counter your move in a way that puts you at a disadvantage.

### Second Player’s Winning Strategy:

- **Keep It at Multiples of 4:** The trick is for the second player to always ensure that after their turn, the total number of pieces left is a multiple of 4.
- **How to Pull It Off:**
  - If the first player takes **1 piece**, you take **3**. Now there are **16** pieces left.
  - If they take **2 pieces**, you grab **2**. Again, **16** pieces remain.
  - If they take **3 pieces**, you pick up **1**. Once more, **16** pieces are left.

By doing this, you're controlling the flow of the game. The first player can't break out of this pattern, and eventually, they'll be forced to take the last piece and lose.

## Is the Game Fair?

**Not Exactly:** The game's fairness tilts depending on the starting number of pieces.

- **Multiples of 4 (like 20):** The second player can always secure the win if they play it right.
- **Not Multiples of 4:** The first player gains the upper hand.

## Does Going First Help?

**It Depends:** Sometimes going first is advantageous, other times not so much. It all hinges on that starting number.

## Is This True for Any Number of Pieces?

**Yes:** This strategy works no matter how many pieces you start with. Just aim to leave a multiple of 4 after your turn.

## Is This Provable?

**Absolutely:** It's a simple pattern that plays out every time if you stick to the plan. Think of it like a game plan—you're using a straightforward strategy to keep the odds in your favor.

## Implementation Details

### Technologies Used

- **React with TypeScript:** Leveraged for building the user interface and managing application logic.
- **Three.js:** Chosen for visualization due to familiarity, providing an interactive 3D representation of the playing surface.
- **Tailwind CSS with Vite:** Utilized Tailwind CSS for rapid and efficient styling, and Vite as the build tool to increase development speed.
- **GitHub Repository Setup:** Employed my own GitHub repo setup to streamline version control and collaboration, boosting development efficiency.
- **Vercel for Deployment:** Opted for Vercel because it's easy to use and automates deployment on push, accelerating the deployment process.

### AI Strategy Implementation

- **Optimal Play:** The computer player is programmed to play optimally, making it challenging for the human player to win.
- **Strategic Moves:** The AI uses the mathematical strategy of leaving the opponent with a multiple of 4 after its turn.
- **Adaptive Logic:** By calculating the best possible move each turn, the AI ensures it tries to win as much as possible.

## Further Development (Online Multiplayer)

Consider enhancing the game by adding online multiplayer functionality:

- **Database Integration:** Manage online multiplayer by tracking session IDs and player IDs in a database, without requiring users to log in.
- **Shared Game State:** By sharing a session ID, two players can interact with the same game state in the database, allowing them to play on their devices respectively.
- **State Management:** The database would track move counts, the current player, and other game states to synchronize gameplay across devices.
