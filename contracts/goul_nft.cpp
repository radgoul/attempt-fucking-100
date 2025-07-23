#include <eosio/eosio.hpp>
#include <eosio/asset.hpp>
#include <string>

using namespace eosio;

class [[eosio::contract]] goul_nft : public contract {
public:
    using contract::contract;

    struct [[eosio::table]] token {
        uint64_t id;
        name owner;
        std::string name;
        std::string description;
        std::string image;
        uint64_t created_at;
        
        uint64_t primary_key() const { return id; }
        uint64_t get_owner() const { return owner.value; }
    };

    typedef multi_index<"tokens"_n, token,
        indexed_by<"byowner"_n, const_mem_fun<token, uint64_t, &token::get_owner>>
    > tokens_table;

    struct [[eosio::table]] order {
        uint64_t id;
        name customer;
        std::string full_name;
        std::string email;
        std::string street_address;
        std::string city;
        std::string state;
        std::string zip_code;
        std::string country;
        bool mint_anonymously;
        uint64_t token_id;
        std::string transaction_hash;
        uint64_t created_at;
        
        uint64_t primary_key() const { return id; }
        uint64_t get_customer() const { return customer.value; }
    };

    typedef multi_index<"orders"_n, order,
        indexed_by<"bycustomer"_n, const_mem_fun<order, uint64_t, &order::get_customer>>
    > orders_table;

    [[eosio::action]]
    void mint(name to, uint64_t token_id, std::string metadata) {
        require_auth(to);
        
        tokens_table tokens(get_self(), get_self().value);
        
        // Parse metadata JSON (simplified)
        auto metadata_obj = parse_metadata(metadata);
        
        tokens.emplace(get_self(), [&](auto& t) {
            t.id = token_id;
            t.owner = to;
            t.name = metadata_obj["name"];
            t.description = metadata_obj["description"];
            t.image = metadata_obj["image"];
            t.created_at = current_time_point().sec_since_epoch();
        });
        
        // Create order record
        orders_table orders(get_self(), get_self().value);
        orders.emplace(get_self(), [&](auto& o) {
            o.id = orders.available_primary_key();
            o.customer = to;
            o.token_id = token_id;
            o.created_at = current_time_point().sec_since_epoch();
        });
    }

    [[eosio::action]]
    void transfer(name from, name to, uint64_t token_id) {
        require_auth(from);
        
        tokens_table tokens(get_self(), get_self().value);
        auto itr = tokens.find(token_id);
        check(itr != tokens.end(), "Token does not exist");
        check(itr->owner == from, "Not the token owner");
        
        tokens.modify(itr, get_self(), [&](auto& t) {
            t.owner = to;
        });
    }

    [[eosio::action]]
    void createorder(name customer, std::string full_name, std::string email,
                    std::string street_address, std::string city, std::string state,
                    std::string zip_code, std::string country, bool mint_anonymously) {
        require_auth(customer);
        
        orders_table orders(get_self(), get_self().value);
        orders.emplace(get_self(), [&](auto& o) {
            o.id = orders.available_primary_key();
            o.customer = customer;
            o.full_name = full_name;
            o.email = email;
            o.street_address = street_address;
            o.city = city;
            o.state = state;
            o.zip_code = zip_code;
            o.country = country;
            o.mint_anonymously = mint_anonymously;
            o.created_at = current_time_point().sec_since_epoch();
        });
    }

private:
    // Simple metadata parser (in production, use a proper JSON library)
    std::map<std::string, std::string> parse_metadata(std::string metadata) {
        std::map<std::string, std::string> result;
        // This is a simplified parser - in production use a proper JSON library
        result["name"] = "GOUL Shirt NFT";
        result["description"] = "Exclusive GOUL Shirt NFT";
        result["image"] = "https://your-nft-image-url.com/goul-shirt.png";
        return result;
    }
};

EOSIO_DISPATCH(goul_nft, (mint)(transfer)(createorder)) 