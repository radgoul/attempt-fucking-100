# GOUL Shoppe NFT Minting Website

**TREMENDOUS! FANTASTIC! THE BEST NFT MINTING WEBSITE EVER CREATED!** 🇺🇸

Listen folks, this is absolutely incredible. We've built the most amazing, the most beautiful, the most tremendous NFT minting website that the world has ever seen. It's going to make America GOUL again, and let me tell you, it's going to be HUGE!

This is a modern NFT minting website built with React, Node.js, MongoDB, and Scatter API for EOS blockchain integration. And let me tell you, nobody builds websites like this. Nobody!

## Features

**INCREDIBLE FEATURES! THE BEST FEATURES!** 

- 🎨 **Custom Assets Integration** - Animated background, custom fonts, and sound effects (TREMENDOUS!)
- 🎭 **Goosebump Font** - Custom font for "MAKE AMERICA GOUL AGAIN" title (BEAUTIFUL!)
- 🎬 **Animated Background** - 0520.gif as the main background (SPECTACULAR!)
- 🎉 **Success Animation** - 0703.gif overlay on successful mint (AMAZING!)
- 🔊 **Sound Effects** - "Bomb has been planted" sound on successful actions (INCREDIBLE!)
- 🏷️ **Custom Logo** - tag001.png in the top left corner (FANTASTIC!)
- 🌍 **International Support** - Works for the whole world, not just America (WE'RE GOING GLOBAL!)
- 🔗 **Scatter Wallet Integration** - Connect and interact with EOS blockchain (THE BEST!)
- 🏗️ **NFT Minting** - Mint GOUL Shirt NFTs directly from the website (HUGE!)
- 📊 **Admin Panel** - View total orders and download order data (TREMENDOUS!)
- 🗄️ **MongoDB Database** - Store order information securely (VERY SECURE!)
- 📱 **Responsive Design** - Works on desktop and mobile devices (PERFECT!)
- ⚡ **Real-time Updates** - Live order count and transaction status (INCREDIBLE!)

## Tech Stack

**THE BEST TECHNOLOGY! TREMENDOUS TECHNOLOGY!**

### Frontend
- React 18 (INCREDIBLE!)
- ScatterJS for wallet integration (THE BEST!)
- EOSJS for blockchain interactions (FANTASTIC!)
- Axios for API calls (AMAZING!)
- CSS3 with modern styling (BEAUTIFUL!)

### Backend
- Node.js with Express (TREMENDOUS!)
- MongoDB with Mongoose (VERY POWERFUL!)
- CORS enabled (VERY SECURE!)
- RESTful API endpoints (THE BEST!)

### Blockchain
- EOS blockchain (INCREDIBLE!)
- Scatter wallet integration (FANTASTIC!)
- Custom NFT minting contract (HUGE!)

## Prerequisites

**YOU NEED THESE THINGS! VERY IMPORTANT!**

- Node.js (v14 or higher) - THE BEST!
- npm or yarn - TREMENDOUS!
- MongoDB Atlas account (or local MongoDB) - INCREDIBLE!
- Scatter wallet extension installed in browser - FANTASTIC!
- EOS account for testing - AMAZING!
- Custom assets folder: `G:\art\maga site shit fuck ai\` (or run `copy-assets.bat` to copy them) - BEAUTIFUL!

## Installation

**INCREDIBLE INSTALLATION PROCESS! THE BEST!**

1. **Clone the repository** (TREMENDOUS!)
   ```bash
   git clone <repository-url>
   cd goul-shoppe-mint
   ```

2. **Install server dependencies** (FANTASTIC!)
   ```bash
   npm install
   ```

3. **Install client dependencies** (AMAZING!)
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Copy custom assets** (BEAUTIFUL!)
   
   Run the asset copy script to copy your custom assets:
   ```bash
   copy-assets.bat
   ```
   
   Or manually copy from `G:\art\maga site shit fuck ai\` to `client\src\assets\`

5. **Configure environment variables** (VERY IMPORTANT!)
   
   Update the `config.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/goul-shoppe?retryWrites=true&w=majority
   PORT=4000
   NODE_ENV=development
   EOS_NETWORK=mainnet
   EOS_CONTRACT_ACCOUNT=goulshoppe
   ```

6. **Start the development servers** (INCREDIBLE!)

   In the root directory:
   ```bash
   # Start the backend server
   npm run dev
   ```

   In a new terminal, navigate to the client directory:
   ```bash
   cd client
   npm start
   ```

7. **Open your browser** (FANTASTIC!)
   
   Navigate to `http://localhost:3000` to view the application.

## Usage

**INCREDIBLE USAGE! THE BEST WAY TO USE IT!**

### For Users (TREMENDOUS!)

1. **Connect Wallet** (FANTASTIC!)
   - Click "Connect Wallet" button
   - Approve the connection in your Scatter wallet
   - Your wallet address will be displayed

2. **Mint NFT** (AMAZING!)
   - Fill in the required shipping information (unless minting anonymously)
   - Click "MINT NFT" button
   - Approve the transaction in Scatter
   - Wait for confirmation

3. **View Transaction** (INCREDIBLE!)
   - Transaction hash will be displayed upon successful minting
   - You can view your NFT in your wallet

### For Admins (THE BEST!)

1. **View Orders** (TREMENDOUS!)
   - Total order count is displayed in the admin panel
   - Click "Download Orders JSON" to export all order data

2. **Monitor Activity** (FANTASTIC!)
   - Orders are stored in MongoDB with full details
   - Transaction hashes are linked to orders

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/count` - Get total order count
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/transaction` - Update order with transaction hash

## Database Schema

### Order Model
```javascript
{
  fullName: String (required),
  email: String (required),
  streetAddress: String (required),
  city: String (required),
  state: String (required),
  zipCode: String (required),
  country: String (default: 'USA'),
  mintAnonymously: Boolean (default: false),
  walletAddress: String (required),
  transactionHash: String,
  mintedAt: Date (default: now),
  status: String (enum: ['pending', 'minted', 'failed'])
}
```

## Configuration

### EOS Contract Setup

1. Deploy your NFT contract to the EOS blockchain
2. Update the contract account name in the frontend code
3. Ensure your contract has the `mint` action implemented

### Scatter Configuration

The app is configured to work with:
- EOS Mainnet
- Scatter wallet extension
- Greymass EOS endpoint

## Deployment

### Production Build

1. **Build the React app**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Set environment variables**
   ```bash
   NODE_ENV=production
   ```

3. **Start the production server**
   ```bash
   npm start
   ```

### Heroku Deployment

1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Heroku Git or GitHub integration

## Security Considerations

- MongoDB connection string is stored in environment variables
- CORS is configured for security
- Input validation on both frontend and backend
- Transaction signing handled by Scatter wallet

## Troubleshooting

### Common Issues

1. **Scatter not connecting**
   - Ensure Scatter extension is installed
   - Check if Scatter is unlocked
   - Verify network settings in Scatter

2. **MongoDB connection failed**
   - Check your connection string
   - Ensure IP whitelist includes your IP
   - Verify username and password

3. **Transaction failed**
   - Check EOS account balance
   - Verify contract permissions
   - Ensure contract is deployed correctly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, contact: @0xGouL

---

**GOUL Shoppe** - Making America GOUL Again! 🇺🇸

**TREMENDOUS! FANTASTIC! THE BEST NFT WEBSITE EVER CREATED!**

Listen folks, this is going to be HUGE. We're making America GOUL again, and we're doing it with the most incredible technology, the most beautiful design, and the most amazing features that the world has ever seen. This is going to be tremendous for everyone - for America, for the world, for the blockchain community. It's going to be absolutely incredible!

**GOUL Shoppe** - Because nobody builds websites like this. Nobody! 🇺🇸

```
                                                                                                               
                                                                                                               
                                               %%%                                                             
                                                %%%%                                                           
                       %%%                        %*%%                                                         
                     %##%       %%%                %+-%%                                                       
                   %#-*%      %%%%%%%%   %%%%%%%    %---#%                                                     
                 %#--=%%     %%%   %%%  %%%%  %%    %-----#%                                                   
               %#=---*%     %%%     %%  %%          %-------#%%                                                
             %#=-----%       %%%    %%  %%         %*--------=#%                                               
           %%+------+%              %%  %%%       %%-----------+%%                                             
          %*--------#%              %%   %%%%%    %=-------------*%                                            
        %#=---------#%             %%%     %%%%%%%+---------------=%%         %%%###*##%                       
       %#-----------*%             %%    %%%##*#%#**##=------------+%     %%#**********#%                      
      %*-------------%            %%%%#**********%#****#+-----------#% %%#**************#                      
     %+--------------=%         %%%#*************#%******#+---------#%#*****************#                      
    %+----------------###%%%##****##*************##********%------+#********************#                      
   %*---------------+#************##***********###**********#=--##*********************#%                      
   %#-------------=#***************#####*********************##*#**********************#%                      
    %%-----------*#******************************##********##**#***********************#%                      
      %*--------#**************#*****#%**********%%#*****##***#************************%                       
       %%=----=#************##***#***%%%*********%%#***##*****************************%                        
         %#=-*#***********##******#**%%%**********#**##******************************%%                        
           %%***********##*********#*#%#************#*******************************#%                         
           %%**********#***********#**************#********************************#%                          
            %*********#*************#********#***#********************************#%                           
            %************************#**********#********************************%%                            
            %*************************#****************************************#%                              
           %#****************#*********#*************************************#%                                
           %****************#%#********************************************#%%                                 
          %#***************#%%%****************###***##******************#%%                                   
         %#****************%%%%%************##+--------+#**************##%                                     
        %#****************%%%%%%%*********#+-------------=*#*******##%#**#%%                                   
       %%****************%%%%%%%#+##**##*--------------------=+*+==--=#****#%                                  
       %****************%%%%%%%%%#------------------------------------#*****#%                                 
      %****************%%%%%%%%%%%%*----------------------------------#*******#%                               
     %*********#******#%*******#%---=**=------------------------------#*********#%                             
    %*********#*******************#=------+*+=-----------------------=#***********#%                           
   %#*********#********************#*--------------------------------+#*************#%                         
  %#**********#**********************#=------------------------------*****************#%%                      
 %#***********##**********************#+-----------------------------#******************#%                     
%#**************##*********************#*---------------------------+#********************#%                   
#****************************************#-------------------------=#***********************%%                 
******************************************#=-----------------------#*************************#%%               
*******************************************#+---------------------%****************************#%              
*********************************************%------------------=%******************************#%             
***********************************************#---------------##*********************************%%           
************************************************##+---------=##************************************#%          
****************************************************########****************************************#%         
*****************************************************************************************************#%        
******************************************************************************************************#%       
*******************************************************************************************************%       
*******************************************************************************************************#%      
********************************************************************************************************%      
********************************************************************************************************%      
********************************************************************************************************%%     
********************************************************************************************************%%     
********************************************************************************************************%%     
********************************************************************************************************%%     
********************************************************************************************************%%     
********************************************************************************************************%%     
``` 