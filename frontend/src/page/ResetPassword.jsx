import React, { useState } from 'react';
import API from '../api/api'; // Đảm bảo đường dẫn đúng
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../Auth.css'; // Import file CSS bạn cung cấp

// Bạn có thể thay link ảnh này bằng ảnh nội bộ dự án
const BG_IMAGE_URL = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"; 

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPass) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await API.put(`/auth/resetpassword/${resetToken}`, { password });
      setMessage(res.data.message || "Đổi mật khẩu thành công!");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi đổi mật khẩu, vui lòng thử lại.");
    }
  };

  // Layout phần Hình ảnh bên trái (Dùng chung cho cả lúc Success và Form)
  const LeftSide = () => (
    <div 
      className="auth-image-side" 
      style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
    >
      {/* Lớp phủ màu đã có trong CSS (::after) */}
    </div>
  );

  // Hiển thị khi thành công
  if (message) {
    return (
      <div className="auth-page">
        <LeftSide />
        <div className="auth-form-side">
          <div className="auth-container" style={{ textAlign: 'center' }}>
            <div className="auth-branding">
               <span className="logo-text" style={{fontSize: '60px'}}>✅</span>
               <div className="app-name" style={{color: '#10b981'}}>Thành công!</div>
            </div>
            <p className="welcome-text">{message}</p>
            <p style={{marginTop: '10px', color: '#666'}}>Đang chuyển hướng về trang đăng nhập...</p>
            <div className="auth-actions" style={{justifyContent: 'center', marginTop: '30px'}}>
               <Link to="/login" className="link-blue">Đăng nhập ngay</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Hiển thị Form nhập liệu
  return (
    <div className="auth-page">
      {/* 1. CỘT TRÁI: HÌNH ẢNH */}
      <LeftSide />

      {/* 2. CỘT PHẢI: FORM */}
      <div className="auth-form-side">
        
        {/* Header nhỏ góc trên phải */}
        <div className="top-header">
          <span>Cần hỗ trợ?</span>
          <a href="#" className="link-blue">Liên hệ Hotline</a>
        </div>

        <div className="auth-container">
          {/* Logo & Tiêu đề */}
          <div className="auth-branding">
            <span className="logo-text">C-Wallet</span>
            <div className="app-name">Đặt lại Mật khẩu</div>
            <p className="welcome-text">Vui lòng nhập mật khẩu mới để bảo vệ tài sản của bạn.</p>
          </div>
          
          {/* Thông báo lỗi */}
          {error && (
            <div style={{
              background: '#fee2e2', 
              color:'#b91c1c', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit}>
            <div>
              <label className="input-label">Mật khẩu mới</label>
              <input 
                className="auth-input" 
                type="password" 
                required 
                placeholder="Nhập tối thiểu 6 ký tự" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            <div>
              <label className="input-label">Xác nhận mật khẩu</label>
              <input 
                className="auth-input" 
                type="password" 
                required 
                placeholder="Nhập lại mật khẩu mới" 
                value={confirmPass} 
                onChange={(e) => setConfirmPass(e.target.value)} 
              />
            </div>

            <button className="auth-btn">Xác nhận thay đổi</button>
          </form>

          {/* Footer links */}
          <div className="auth-actions">
            <Link to="/login" className="link-blue">← Quay lại Đăng nhập</Link>
          </div>
        </div>

        {/* Footer bản quyền */}
        <div className="auth-footer">
          <span>© 2024 CryptoWallet Inc.</span>
          <span>Bảo mật & Điều khoản</span>
        </div>
      </div>
    </div>
  );
}