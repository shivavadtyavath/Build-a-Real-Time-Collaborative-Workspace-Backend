require('dotenv').config();

/**
 * Centralized Configuration
 * Following Purple Merit Assessment Requirements:
 * - PostgreSQL: Relational DB (Users, Projects, Workspaces, Roles)
 * - MongoDB: Non-Relational DB (Activity Logs, Events, Job Results)
 * - Redis: Cache & Pub/Sub ONLY
 */

module.exports = {
  // Server
  app: {
    name: process.env.APP_NAME || 'Collaborative Workspace API',
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    apiVersion: process.env.API_VERSION || 'v1'
  },

  // PostgreSQL - Relational Database
  // Stores: Users, Projects, Workspaces, Collaborators, Roles
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    database: process.env.POSTGRES_DB || 'collaborative_workspace',
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres123',
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: false
    }
  },

  // MongoDB - Non-Relational Database
  // Stores: Activity Logs, Real-time Events, Job Results, File Changes
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/collaborative_workspace',
    options: {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000
    }
  },

  // Redis - Cache & Pub/Sub (NOT a database)
  // Uses: Session caching, API response caching, WebSocket Pub/Sub
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    // Cache TTL settings
    cacheTTL: {
      short: 300,      // 5 minutes
      medium: 1800,    // 30 minutes
      long: 3600       // 1 hour
    }
  },

  // JWT Authentication
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    issuer: 'collaborative-workspace-api',
    audience: 'collaborative-workspace-users'
  },

  // Rate Limiting (Assessment Requirement)
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  },

  // CORS Configuration (Assessment Requirement)
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },

  // WebSocket Configuration (Assessment Requirement)
  websocket: {
    cors: {
      origin: process.env.WEBSOCKET_CORS_ORIGIN || 'http://localhost:3001',
      credentials: true,
      methods: ['GET', 'POST']
    },
    pingTimeout: 60000,
    pingInterval: 25000
  },

  // Bull Queue Configuration (Assessment Requirement)
  queue: {
    redis: {
      host: process.env.BULL_REDIS_HOST || 'localhost',
      port: parseInt(process.env.BULL_REDIS_PORT, 10) || 6379
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.NODE_ENV === 'production' ? 'json' : 'simple'
  }
};