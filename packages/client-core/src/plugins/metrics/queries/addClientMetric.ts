export const addClientMetric = `mutation AddClientMetric($type: ClientMetricType!, $value: String) {
  addClientMetric(metric: {metricType: $type, metricValue: $value})
}`;
