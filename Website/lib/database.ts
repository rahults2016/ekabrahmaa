// Mock database implementation
// In a real application, replace this with your actual database (PostgreSQL, MongoDB, etc.)

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  emailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface SessionRecord {
  id: string;
  userId: string;
  refreshToken: string;
  expiresAt: Date;
  createdAt: Date;
  userAgent?: string;
  ipAddress?: string;
}

// Mock in-memory database
const users: Map<string, UserRecord> = new Map();
const sessions: Map<string, SessionRecord> = new Map();
const emailIndex: Map<string, string> = new Map(); // email -> userId

// User operations
export const createUser = async (userData: {
  email: string;
  name: string;
  passwordHash: string;
  emailVerificationToken?: string;
}): Promise<UserRecord> => {
  const id = generateId();
  const now = new Date();
  
  const user: UserRecord = {
    id,
    email: userData.email.toLowerCase(),
    name: userData.name,
    passwordHash: userData.passwordHash,
    emailVerified: false,
    emailVerificationToken: userData.emailVerificationToken,
    createdAt: now,
    updatedAt: now
  };
  
  users.set(id, user);
  emailIndex.set(user.email, id);
  
  return user;
};

export const findUserByEmail = async (email: string): Promise<UserRecord | null> => {
  const userId = emailIndex.get(email.toLowerCase());
  if (!userId) return null;
  
  return users.get(userId) || null;
};

export const findUserById = async (id: string): Promise<UserRecord | null> => {
  return users.get(id) || null;
};

export const updateUser = async (id: string, updates: Partial<UserRecord>): Promise<UserRecord | null> => {
  const user = users.get(id);
  if (!user) return null;
  
  const updatedUser = {
    ...user,
    ...updates,
    updatedAt: new Date()
  };
  
  users.set(id, updatedUser);
  
  // Update email index if email changed
  if (updates.email && updates.email !== user.email) {
    emailIndex.delete(user.email);
    emailIndex.set(updates.email.toLowerCase(), id);
  }
  
  return updatedUser;
};

export const verifyUserEmail = async (token: string): Promise<UserRecord | null> => {
  for (const user of users.values()) {
    if (user.emailVerificationToken === token) {
      return updateUser(user.id, {
        emailVerified: true,
        emailVerificationToken: undefined
      });
    }
  }
  return null;
};

export const setPasswordResetToken = async (email: string, token: string, expiresAt: Date): Promise<boolean> => {
  const user = await findUserByEmail(email);
  if (!user) return false;
  
  await updateUser(user.id, {
    passwordResetToken: token,
    passwordResetExpires: expiresAt
  });
  
  return true;
};

export const resetPassword = async (token: string, newPasswordHash: string): Promise<UserRecord | null> => {
  for (const user of users.values()) {
    if (user.passwordResetToken === token && 
        user.passwordResetExpires && 
        user.passwordResetExpires > new Date()) {
      return updateUser(user.id, {
        passwordHash: newPasswordHash,
        passwordResetToken: undefined,
        passwordResetExpires: undefined
      });
    }
  }
  return null;
};

// Session operations
export const createSession = async (sessionData: {
  userId: string;
  refreshToken: string;
  expiresAt: Date;
  userAgent?: string;
  ipAddress?: string;
}): Promise<SessionRecord> => {
  const id = generateId();
  const session: SessionRecord = {
    id,
    ...sessionData,
    createdAt: new Date()
  };
  
  sessions.set(id, session);
  return session;
};

export const findSessionByRefreshToken = async (refreshToken: string): Promise<SessionRecord | null> => {
  for (const session of sessions.values()) {
    if (session.refreshToken === refreshToken && session.expiresAt > new Date()) {
      return session;
    }
  }
  return null;
};

export const deleteSession = async (refreshToken: string): Promise<boolean> => {
  for (const [id, session] of sessions.entries()) {
    if (session.refreshToken === refreshToken) {
      sessions.delete(id);
      return true;
    }
  }
  return false;
};

export const deleteUserSessions = async (userId: string): Promise<void> => {
  for (const [id, session] of sessions.entries()) {
    if (session.userId === userId) {
      sessions.delete(id);
    }
  }
};

// Utility functions
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Cleanup expired sessions (run periodically)
export const cleanupExpiredSessions = async (): Promise<void> => {
  const now = new Date();
  for (const [id, session] of sessions.entries()) {
    if (session.expiresAt <= now) {
      sessions.delete(id);
    }
  }
};

// Initialize with demo data
export const initializeDemoData = async (): Promise<void> => {
  // Create a demo user for testing
  const { hashPassword } = await import('./auth');
  
  const demoUser = await createUser({
    email: 'demo@ekabrahmaa.com',
    name: 'Demo User',
    passwordHash: await hashPassword('Demo123!'),
  });
  
  // Verify the demo user's email
  await updateUser(demoUser.id, { emailVerified: true });
};

// Initialize demo data
initializeDemoData();