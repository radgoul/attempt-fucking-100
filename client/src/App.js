import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  
  // Country data for international shipping
  const countries = [
    { code: 'USA', name: 'United States', hasState: true, hasZip: true },
    { code: 'CAN', name: 'Canada', hasState: true, hasZip: true },
    { code: 'GBR', name: 'United Kingdom', hasState: false, hasZip: true },
    { code: 'AUS', name: 'Australia', hasState: true, hasZip: true },
    { code: 'DEU', name: 'Germany', hasState: false, hasZip: true },
    { code: 'FRA', name: 'France', hasState: false, hasZip: true },
    { code: 'ITA', name: 'Italy', hasState: false, hasZip: true },
    { code: 'ESP', name: 'Spain', hasState: false, hasZip: true },
    { code: 'NLD', name: 'Netherlands', hasState: false, hasZip: true },
    { code: 'JPN', name: 'Japan', hasState: false, hasZip: true },
    { code: 'KOR', name: 'South Korea', hasState: false, hasZip: true },
    { code: 'CHN', name: 'China', hasState: false, hasZip: true },
    { code: 'IND', name: 'India', hasState: true, hasZip: true },
    { code: 'BRA', name: 'Brazil', hasState: true, hasZip: true },
    { code: 'MEX', name: 'Mexico', hasState: true, hasZip: true },
    { code: 'RUS', name: 'Russia', hasState: false, hasZip: true },
    { code: 'ZAF', name: 'South Africa', hasState: false, hasZip: true },
    { code: 'EGY', name: 'Egypt', hasState: false, hasZip: true },
    { code: 'TUR', name: 'Turkey', hasState: false, hasZip: true },
    { code: 'SAU', name: 'Saudi Arabia', hasState: false, hasZip: true }
  ];
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    postalCode: '',
    country: 'USA',
    mintAnonymously: false
  });

  const selectedCountry = countries.find(c => c.code === formData.country) || countries[0];

  // Initialize wallet connection
  useEffect(() => {
    fetchTotalOrders();
  }, []);

  const fetchTotalOrders = async () => {
    try {
      const response = await axios.get('/api/orders/count');
      setTotalOrders(response.data.count);
    } catch (error) {
      console.error('Error fetching total orders:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate wallet connection for demo purposes
      // In a real implementation, you would integrate with a wallet like Anchor, Scatter, or WAX Cloud Wallet
      const mockAddress = '0x' + Math.random().toString(36).substr(2, 9) + '...' + Math.random().toString(36).substr(2, 9);
      
      setWalletConnected(true);
      setWalletAddress(mockAddress);
      setSuccess('Wallet connected successfully! (Demo Mode)');
      
      // Play bomb sound effect for wallet connection too
      const audio = new Audio(require('./assets/bomb-has-been-planted-sound-effect-cs-go.mp3'));
      audio.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      setError('Failed to connect wallet: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMint = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Validate form
      if (!formData.fullName || !formData.email || !formData.streetAddress || 
          !formData.city || 
          (selectedCountry.hasState && !formData.state) || 
          (!formData.zipCode && !formData.postalCode)) {
        throw new Error('Please fill in all required fields');
      }

      if (!walletConnected) {
        throw new Error('Please connect your wallet first');
      }

      // Create order in database
      const orderResponse = await axios.post('/api/orders', {
        ...formData,
        zipCode: formData.zipCode || formData.postalCode,
        walletAddress
      });

      // Simulate NFT minting for demo purposes
      // In a real implementation, you would integrate with EOS blockchain
      const mockTransactionHash = '0x' + Math.random().toString(36).substr(2, 64);
      
      // Update order with transaction hash
      await axios.put(`/api/orders/${orderResponse.data._id}/transaction`, {
        transactionHash: mockTransactionHash
      });

      setSuccess('NFT minted successfully! Transaction: ' + mockTransactionHash + ' (Demo Mode)');
      
      // Play bomb sound effect
      const audio = new Audio(require('./assets/bomb-has-been-planted-sound-effect-cs-go.mp3'));
      audio.play().catch(e => console.log('Audio play failed:', e));
      
      // Show success overlay
      setShowSuccessOverlay(true);
      setTimeout(() => {
        setShowSuccessOverlay(false);
      }, 3000);
      
      setFormData({
        fullName: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        postalCode: '',
        country: 'USA',
        mintAnonymously: false
      });
      
      fetchTotalOrders();
    } catch (error) {
      setError('Minting failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      postalCode: '',
      country: 'USA',
      mintAnonymously: false
    });
    setError('');
    setSuccess('');
  };

  const downloadOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'goul-orders.json';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setError('Failed to download orders');
    }
  };

  return (
    <div className="container">

      
      {/* Logo in top left corner */}
      <img src={require('./assets/tag001.png')} alt="GOUL Logo" className="logo" />
      
      {/* Success overlay */}
      <div className={`success-overlay ${showSuccessOverlay ? 'show' : ''}`}></div>
      
      <h1 className="main-title">MAKE AMERICA GOUL AGAIN!!!</h1>
      
      {/* Wallet Status */}
      <div className="wallet-status">
        {walletConnected ? (
          <>
            <span className="wallet-connected">✓ Wallet Connected!</span>
            <div className="wallet-address">Address: {walletAddress}</div>
          </>
        ) : (
          <button 
            className="connect-wallet-btn" 
            onClick={connectWallet}
            disabled={loading}
          >
            {loading ? <span className="loading"></span> : 'Connect Wallet'}
          </button>
        )}
      </div>

      {/* Error/Success Messages */}
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {/* Mint Form */}
      <div className="mint-form-container">
        <h2 className="mint-form-title">Mint Your GOUL Shirt NFT</h2>
        
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="mintAnonymously"
            name="mintAnonymously"
            className="checkbox-input"
            checked={formData.mintAnonymously}
            onChange={handleInputChange}
          />
          <label htmlFor="mintAnonymously" className="checkbox-label">
            Mint anonymously (no shipping info required)
          </label>
        </div>

        {!formData.mintAnonymously && (
          <>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <input
                type="text"
                name="streetAddress"
                className="form-input"
                placeholder="Enter your street address"
                value={formData.streetAddress}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              {selectedCountry.hasState && (
                <div className="form-group">
                  <label className="form-label">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    className="form-input"
                    placeholder={selectedCountry.code === 'CAN' ? 'Province' : 'State'}
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  {selectedCountry.code === 'USA' ? 'ZIP Code' : 
                   selectedCountry.code === 'CAN' ? 'Postal Code' :
                   selectedCountry.code === 'GBR' ? 'Postcode' :
                   'Postal Code'} *
                </label>
                <input
                  type="text"
                  name={selectedCountry.code === 'USA' ? 'zipCode' : 'postalCode'}
                  className="form-input"
                  placeholder={selectedCountry.code === 'USA' ? 'ZIP Code' : 
                              selectedCountry.code === 'CAN' ? 'Postal Code' :
                              selectedCountry.code === 'GBR' ? 'Postcode' :
                              'Postal Code'}
                  value={selectedCountry.code === 'USA' ? formData.zipCode : formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country *</label>
                <select
                  name="country"
                  className="form-input"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <div className="button-group">
          <button
            className="mint-btn"
            onClick={handleMint}
            disabled={loading || !walletConnected}
          >
            {loading ? <span className="loading"></span> : 'MINT NFT'}
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      {/* Admin Panel */}
      <div className="admin-panel">
        <h3 className="admin-title">Admin Panel</h3>
        <div className="total-orders">Total Orders: {totalOrders}</div>
        <button className="download-btn" onClick={downloadOrders}>
          Download Orders JSON
        </button>
      </div>

      {/* Footer */}
      <div className="footer">
        Questions? @0xGouL
      </div>
    </div>
  );
}

export default App; 