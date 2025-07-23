# GOUL NFT Smart Contract

This directory contains the EOS smart contract for the GOUL Shoppe NFT minting platform.

## Contract Features

- **NFT Minting**: Create new GOUL Shirt NFTs
- **Token Transfer**: Transfer NFTs between accounts
- **Order Management**: Store customer order information
- **Metadata Support**: Store NFT metadata on-chain

## Contract Actions

### `mint`
Mints a new NFT to the specified account.

**Parameters:**
- `to` (name): The account to mint the NFT to
- `token_id` (uint64): Unique token identifier
- `metadata` (string): JSON metadata for the NFT

### `transfer`
Transfers an NFT from one account to another.

**Parameters:**
- `from` (name): Current owner of the NFT
- `to` (name): New owner of the NFT
- `token_id` (uint64): Token identifier to transfer

### `createorder`
Creates a new order record on-chain.

**Parameters:**
- `customer` (name): Customer's EOS account
- `full_name` (string): Customer's full name
- `email` (string): Customer's email address
- `street_address` (string): Shipping address
- `city` (string): City
- `state` (string): State
- `zip_code` (string): ZIP code
- `country` (string): Country
- `mint_anonymously` (bool): Whether to mint anonymously

## Deployment Instructions

### Prerequisites

1. **EOS Development Environment**
   ```bash
   # Install EOSIO.CDT
   git clone https://github.com/EOSIO/eosio.cdt.git
   cd eosio.cdt
   ./build.sh
   sudo ./install.sh
   ```

2. **EOS Account**
   - Create an EOS account for your contract
   - Ensure you have sufficient RAM and CPU resources

### Compilation

1. **Compile the contract**
   ```bash
   eosio-cpp -o goul_nft.wasm goul_nft.cpp
   ```

2. **Generate ABI**
   ```bash
   eosio-abigen goul_nft.cpp --contract=goul_nft --output=goul_nft.abi
   ```

### Deployment

1. **Set contract**
   ```bash
   cleos set contract goulshoppe ./ goul_nft.wasm goul_nft.abi
   ```

2. **Set permissions** (if needed)
   ```bash
   cleos set account permission goulshoppe active --add-code
   ```

### Testing

1. **Test minting**
   ```bash
   cleos push action goulshoppe mint '["customer1", 1, "{\"name\":\"GOUL Shirt NFT\",\"description\":\"Exclusive NFT\",\"image\":\"https://example.com/image.png\"}"]' -p customer1@active
   ```

2. **Test transfer**
   ```bash
   cleos push action goulshoppe transfer '["customer1", "customer2", 1]' -p customer1@active
   ```

3. **Test order creation**
   ```bash
   cleos push action goulshoppe createorder '["customer1", "John Doe", "john@example.com", "123 Main St", "New York", "NY", "10001", "USA", false]' -p customer1@active
   ```

## Integration with Frontend

The frontend application integrates with this contract through:

1. **Scatter Wallet**: For transaction signing
2. **EOSJS**: For blockchain interactions
3. **Contract Actions**: Direct calls to contract actions

### Example Integration Code

```javascript
// Connect to EOS blockchain
const eos = ScatterJS.scatter.eos('eos', Eos, {
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  httpEndpoint: 'https://eos.greymass.com'
});

// Mint NFT
const mintAction = {
  account: 'goulshoppe',
  name: 'mint',
  authorization: [{
    actor: walletAddress,
    permission: 'active'
  }],
  data: {
    to: walletAddress,
    token_id: Date.now(),
    metadata: JSON.stringify({
      name: 'GOUL Shirt NFT',
      description: 'Exclusive GOUL Shirt NFT',
      image: 'https://your-nft-image-url.com/goul-shirt.png'
    })
  }
};

const result = await eos.transact({
  actions: [mintAction]
}, {
  blocksBehind: 3,
  expireSeconds: 30
});
```

## Security Considerations

1. **Input Validation**: Always validate inputs before processing
2. **Authorization**: Check permissions for all actions
3. **Resource Management**: Monitor RAM and CPU usage
4. **Error Handling**: Implement proper error handling
5. **Testing**: Thoroughly test all contract functions

## Maintenance

1. **Monitor Contract**: Regularly check contract state
2. **Update Metadata**: Keep NFT metadata current
3. **Backup Data**: Maintain off-chain backups
4. **Version Control**: Track contract changes

## Support

For contract-related questions, contact: @0xGouL 