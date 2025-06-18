import { useQuery } from '@tanstack/react-query';
import { checkServerStatusApi } from '../services/healthService';



//UserServerStatus.jsx es un hook, cuz es una función personalizada que encapsula la lógica de consulta del estado del servidor.
// Tiene la abstacción de de tener en cola la API del estado del servidor, haciendo reusable la lógica de consulta y el manejo de estados de carga, error y éxito.
// Límite para considerar el servidor saturado
const SATURATION_THRESHOLD = 3;

export const useServerStatus = ({ isProcessing }) => {
  const { data: healthData, isError, isLoading, isPending } = useQuery({
    queryKey: ['serverStatus'],
    queryFn: checkServerStatusApi,
    refetchInterval: isProcessing ? false : 30000,
    refetchIntervalInBackground: true,
    staleTime: 30000,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !isProcessing,
  });

  // --- Derived State Logic ---
  let statusText = 'Verificando...';
  let statusColor = 'text-yellow-500';
  let dotColor = 'bg-yellow-500';

  if (isError) {
    statusText = 'Servidor Offline';
    statusColor = 'text-red-500';
    dotColor = 'bg-red-500';
  } else if (healthData && healthData.active_processes_count >= SATURATION_THRESHOLD) {
    statusText = 'Servidor saturado, por favor espere';
    statusColor = 'text-orange-500';
    dotColor = 'bg-orange-500';
  } else if (healthData && healthData.status === 'ok') {
    statusText = 'Servidor Online';
    statusColor = 'text-green-500';
    dotColor = 'bg-green-500';
  } else if (isPending) {
    statusText = 'Verificando...';
    statusColor = 'text-yellow-500';
    dotColor = 'bg-yellow-500';
  } else if (!isLoading && !isPending) {
    statusText = 'Estado Desconocido';
    statusColor = 'text-gray-500';
    dotColor = 'bg-gray-500';
  }

  return {
    isLoading: isLoading || isPending,
    isError,
    statusText,
    statusColor,
    dotColor,
    processCount: healthData?.active_processes_count,
  };
};