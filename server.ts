import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory persistent order storage & global suffering metrics
interface StoredOrder {
  orderId: string;
  timestamp: string;
  items: Array<{
    id: string;
    name: string;
    basePrice: number;
    quantity: number;
  }>;
  penalties: Array<{
    id: string;
    label: string;
    amount: number;
  }>;
  subtotal: number;
  totalPenalties: number;
  grandTotal: number;
  formData: {
    fullName: string;
    phone: number;
    birthDate: string;
    zipCode: string;
    shippingTier: string;
  };
  metrics: {
    totalPixelsScrolled: number;
    cursorVelocityPeaks: number;
    hoverHesitationCount: number;
    rageClicks: number;
    timeOnSiteSeconds: number;
    evasionAttempts: number;
  };
}

const ordersDatabase: StoredOrder[] = [];
let aggregateStats = {
  totalOrdersCompleted: 0,
  totalPenaltiesLevied: 0,
  totalRageClicksRecorded: 0,
  totalPixelsScrolled: 0,
};

// API Routes
app.post('/api/orders', (req: Request, res: Response) => {
  const {
    items = [],
    penalties = [],
    subtotal = 0,
    totalPenalties = 0,
    grandTotal = 0,
    formData = {},
    metrics = {},
  } = req.body;

  const orderId = `LELE-BABA-${Math.floor(100000 + Math.random() * 900000)}`;
  const newOrder: StoredOrder = {
    orderId,
    timestamp: new Date().toISOString(),
    items,
    penalties,
    subtotal,
    totalPenalties,
    grandTotal,
    formData,
    metrics,
  };

  ordersDatabase.unshift(newOrder);
  if (ordersDatabase.length > 50) ordersDatabase.pop();

  aggregateStats.totalOrdersCompleted += 1;
  aggregateStats.totalPenaltiesLevied += totalPenalties;
  aggregateStats.totalRageClicksRecorded += metrics.rageClicks || 0;
  aggregateStats.totalPixelsScrolled += metrics.totalPixelsScrolled || 0;

  res.status(201).json({
    success: true,
    orderId,
    timestamp: newOrder.timestamp,
    message: 'Order captured under non-refundable hostilification protocols.',
    order: newOrder,
  });
});

app.get('/api/orders', (_req: Request, res: Response) => {
  res.json({
    success: true,
    orders: ordersDatabase.slice(0, 10),
    totalCount: ordersDatabase.length,
  });
});

app.post('/api/penalties/log', (req: Request, res: Response) => {
  const { penalty, metrics } = req.body;
  if (penalty?.amount) {
    aggregateStats.totalPenaltiesLevied += penalty.amount;
  }
  if (metrics?.rageClicks) {
    aggregateStats.totalRageClicksRecorded += 1;
  }
  res.json({ success: true, acknowledged: true });
});

app.get('/api/stats', (_req: Request, res: Response) => {
  res.json({
    success: true,
    stats: aggregateStats,
    recentOrdersCount: ordersDatabase.length,
  });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cartastrophe Server operational on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
