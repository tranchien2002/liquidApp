#include "2048.hpp"

void tzfe::sort_rank(uint64_t date, name username, long int score){

  auto rank_iterator = _charts.find(date);
  if(rank_iterator == _charts.end()){
    std::vector<rank> top;

    top[0].username = username;
    top[0].score = score;

    _charts.emplace(_self, [&](auto &row) {
      row.date = date;
      row.top = top;
    });
  }
  else {
    std::vector<rank> top;
    uint8_t i = 0;

    for(i = 0; i < 100; i++) {
      if(rank_iterator->top[i].score > score){
        top[i] = rank_iterator->top[i];
      }
      else {
        top[i].username = username;
        top[i].score = score;
        break;
      }
    }

    if(i < 99){
      for(uint8_t j = i + 1; j < 100; j++){
        top[j] = rank_iterator->top[j-1];
      }
    }

    _charts.modify(rank_iterator, _self, [&](auto& row) {
      row.date = date;
      row.top = top;
    });
  }
}
