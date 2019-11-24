#include "tzfe.hpp"
#include "gameplay.cpp"

void tzfe::login(player_struct payload)
{
  auto username = payload.username;
  // Ensure this action is authorized by the player
  require_vaccount(username);

  // Create a record in the table if the player doesn't exist in our app yet
  auto user_iterator = _users.find(username.value);
  if (user_iterator == _users.end())
  {
    user_iterator = _users.emplace(username, [&](auto &new_user) {
      new_user.username = username;
    });
  }
}

void tzfe::startgame(player_struct payload)
{
  auto username = payload.username;
  require_auth(username);

  auto &user = _users.get(username.value, "User doesn't exist");

  _users.modify(user, username, [&](auto &modified_user) {
    gameState game_data;

    modified_user.current_game = game_data;
  });
}

void tzfe::savegame(player_struct payload, vector<vector<uint8_t>> mapState, long int score)
{
  auto username = payload.username;
  require_vaccount(username);

  auto &user = _users.get(username.value, "User doesn't exist.");

  _users.modify(user, username, [&](auto &modified_user) {
    gameState game_data;

    for (uint8_t i = 0; i < 4; i++)
    {
      for (uint8_t j = 0; j < 4; j++)
      {
        game_data.mapState[i][j] = mapState[i][j];
      }
    }

    game_data.score = score;

    game_data.flag_continue = true;

    modified_user.current_game = game_data;
  });
}

void tzfe::endgame(player_struct payload, vector<vector<uint8_t>> mapState, long int score, std::string date)
{
  auto username = payload.username;
  require_vaccount(username);
  auto &user = _users.get(username.value, "User doesn't exist.");

  _users.modify(user, username, [&](auto &modified_user) {
    gameState game_data;

    for (uint8_t i = 0; i < 4; i++)
    {
      for (uint8_t j = 0; j < 4; j++)
      {
        game_data.mapState[i][j] = mapState[i][j];
      }
    }
    game_data.flag_continue = false;
    modified_user.current_game = game_data;
  });
}

// gameState tzfe::continuegame(player_struct payload){
//   auto username = payload.username;
//   require_vaccount(username);

//   gameState game;

//   // Create a record in the table if the player doesn't exist in our app yet
//   auto user_iterator = _users.find(username.value);
//   if (user_iterator != _users.end()) {
//     return user_iterator->current_game;
//   }
// }

//     game_data.score = score;

//     modified_user.current_game = game_data;

//     if(score > modified_user.best_score_game.score){
//       //sort_rank(date, rank);

//       modified_user.best_score_game = game_data;
//     }
//   });
// }
