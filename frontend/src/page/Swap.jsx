import React from 'react';
import { Link } from 'react-router-dom';


export default function Swap() {
  // Sử dụng link Uniswap cơ bản
  const uniswapUrl = "https://app.uniswap.org/#/swap?theme=dark";

  return (
    <div className="swap-page-container">
      
      {/* HEADER */}
      <div className="swap-header">
        <div className="swap-header-left">
           <h2 className="swap-title">🔄 Hoán đổi Token (DEX)</h2>
           <p className="swap-subtitle">Giao dịch an toàn qua Uniswap</p>
        </div>
        
        <Link to="/dashboard" className="back-btn">
          ← Về Dashboard
        </Link>
      </div>

      {/* KHUNG UNISWAP */}
      <div className="uniswap-container">
        {/* THAY ĐỔI Ở ĐÂY: Thêm height="650px" trực tiếp */}
        <iframe
          title="Uniswap"
          src={uniswapUrl}
          width="100%"
          height="650px" 
          style={{
            border: 'none',
            borderRadius: '16px',
            backgroundColor: '#131a2a',
            display: 'block'
          }}
        />
      </div>

    </div>
  );
}