
const express = require('express');

const app = express();
app.use(express.json());

// Data dummy, bukan data perangkat kantor.
const accessPoints = [
  {
    id: 1,
    name: 'AP-LAB-01',
    floor: 1,
    channelUtilization: 45.2,
    interference: 18.2,
    connectedUsers: 22
  },
  {
    id: 2,
    name: 'AP-LAB-02',
    floor: 2,
    channelUtilization: 72,
    interference: 25,
    connectedUsers: 35
  },
  {
    id: 3,
    name: 'AP-LAB-03',
    floor: 3,
    channelUtilization: 85,
    interference: 45,
    connectedUsers: 50
  }
];

function getStatus(ap) {
  if (
    ap.channelUtilization > 80 ||
    ap.interference > 40 ||
    ap.connectedUsers > 40
  ) {
    return 'CRITICAL';
  }

  if (
    ap.channelUtilization > 60 ||
    ap.interference > 20 ||
    ap.connectedUsers > 30
  ) {
    return 'WARNING';
  }

  return 'HEALTH';
}

function formatAccessPoint(ap) {
  return { ...ap, status: getStatus(ap) };
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'network-monitoring-api'
  });
});

app.get('/api/access-points', (req, res) => {
  const data = accessPoints.map(formatAccessPoint);

  res.json({
    count: data.length,
    data
  });
});

app.get('/api/access-points/:id', (req, res) => {
  const id = Number(req.params.id);
  const ap = accessPoints.find((item) => item.id === id);

  if (!ap) {
    return res.status(404).json({
      error: 'Access point not found'
    });
  }

  return res.json(formatAccessPoint(ap));
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Network monitoring API listening on port ${port}`);
  });
}
