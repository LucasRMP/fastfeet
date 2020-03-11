export function getStatus(delivery) {
  if (delivery.canceled_at)
    return { text: 'Cancelada', background: '#FAB0B0', color: '#DE3B3B' };
  if (!delivery.start_date)
    return { text: 'Pendente', background: '#F0F0DF', color: '#C1BC35' };
  if (!delivery.end_date)
    return { text: 'Retirada', background: '#BAD2FF', color: '#4D85EE' };
  return { text: 'Entregue', background: '#DFF0DF', color: '#2CA42B' };
}
