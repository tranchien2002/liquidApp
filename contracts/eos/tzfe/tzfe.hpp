#pragma once
#define VACCOUNTS_DELAYED_CLEANUP 120

#include <eosio/eosio.hpp>
#include <eosio/system.hpp>
#include "../dappservices/vaccounts.hpp"
#include "../dappservices/multi_index.hpp"
#include "../dappservices/cron.hpp"

#define DAPPSERVICES_ACTIONS() \
  XSIGNAL_DAPPSERVICE_ACTION \
  IPFS_DAPPSERVICE_ACTIONS \
  VACCOUNTS_DAPPSERVICE_ACTIONS
#define DAPPSERVICE_ACTIONS_COMMANDS() \
  IPFS_SVC_COMMANDS()VACCOUNTS_SVC_COMMANDS()
#define CONTRACT_NAME() tzfe
using std::string;

using namespace std;
using namespace eosio;


CONTRACT_START()

	private:
		enum game_status: int8_t  {
      ONGOING = 0,
			END = 1
    };

    struct [[eosio::table]] user_info {
			name vaccount;
      long int best_score = 0;

      auto primary_key() const { return vaccount.value; }
    };

    struct rank {
			name vaccount;
			long int score;
		};

		struct [[eosio::table]] charts {
			uint64_t date;
			vector<rank> top;

			auto primary_key() const { return date; }
		};

		typedef dapp::multi_index<name("users"), user_info> users_table;
		typedef eosio::multi_index<".users"_n, user_info> users_table_v_abi;

		TABLE shardbucket {
			std::vector<char> shard_uri;
			uint64_t shard;
			uint64_t primary_key() const {return shard;}
		};

		typedef eosio::multi_index<"users"_n, shardbucket> users_table_abi;

		typedef eosio::multi_index<name("charts"), charts> charts_table;

		users_table _users;
		charts_table  _charts;

		void sort_rank(uint8_t date, name vaccount, long int score);

	public:

		tzfe(name receiver, name code, datastream<const char*> ds):contract(receiver, code, ds),
		 _users(receiver, receiver.value, 1024, 64, false, false, VACCOUNTS_DELAYED_CLEANUP),
			_charts(receiver, receiver.value){}

    struct user_struct {
      uint8_t date;
      name vaccount;
      long int score;
      EOSLIB_SERIALIZE( user_struct,(date)(vaccount)(score))
    };

    // [[eosio::action]]
    // void login(login_struct payload);

    // [[eosio::action]]
		// void startgame(user_struct payload);

		// [[eosio::action]]
		// tzfe::gameState continuegame(user_struct payload);

		// [[eosio::action]]
		// void savegame(user_struct payload);

		[[eosio::action]]
		void endgame(user_struct payload);

  VACCOUNTS_APPLY(((user_struct)(endgame)))
CONTRACT_END((endgame)(xdcommit)(regaccount)(xvinit))
