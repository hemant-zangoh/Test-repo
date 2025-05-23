const bcrypt = require('bcryptjs');
const { pool } = require('../utils/database');

class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || 'user';
    this.isVerified = data.is_verified || false;
    this.verificationToken = data.verification_token;
    this.resetToken = data.reset_token;
    this.resetTokenExpiry = data.reset_token_expiry;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  static async create({ email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 10);
    const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    const query = `
      INSERT INTO users (email, password, role, verification_token)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await pool.query(query, [email, hashedPassword, role, verificationToken]);
    return new User(result.rows[0]);
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new User(result.rows[0]);
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return new User(result.rows[0]);
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  async verify() {
    const query = `
      UPDATE users 
      SET is_verified = true, verification_token = NULL, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await pool.query(query, [this.id]);
    Object.assign(this, result.rows[0]);
    return this;
  }

  async setResetToken(token, expiry) {
    const query = `
      UPDATE users 
      SET reset_token = $1, reset_token_expiry = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;
    
    const result = await pool.query(query, [token, expiry, this.id]);
    Object.assign(this, result.rows[0]);
    return this;
  }

  async updatePassword(newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUNDS) || 10);
    
    const query = `
      UPDATE users 
      SET password = $1, reset_token = NULL, reset_token_expiry = NULL, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    
    const result = await pool.query(query, [hashedPassword, this.id]);
    Object.assign(this, result.rows[0]);
    return this;
  }

  toJSON() {
    const { password, verificationToken, resetToken, resetTokenExpiry, ...user } = this;
    return user;
  }
}

module.exports = User;