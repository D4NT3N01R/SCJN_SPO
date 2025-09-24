import { useState, useEffect, useCallback } from 'react';
import { AgGridTable } from '../table';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'; // <-- Se agregó useNavigate
import { DeleteButtonRenderer } from '../buttons/deletebutton';
import { ArrowLeft } from 'lucide-react'; // <-- Icono para el botón

// ... (SCJN Institutional Colors y gridContainerStyle se mantienen igual)
const scjnBlack = "#1D1D1B";
const scjnDarkBlue = "#003A70";
const scjnLightBlue = "#7DA1C4";
const scjnWhite = "#FFFFFF";
const scjnOffWhite = "#F7F9FC";

// Styles for centering the grid container
const gridContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  minHeight: 'calc(100vh - 40px)',
  boxSizing: 'border-box',
  width: '100%', // Asegura que ocupe todo el ancho disponible
};


/**
 * Componente Body
 *
 * - Renderiza la tabla de datos de periodicos oficiales por estado usando AgGridTable.
 * - Permite agregar, editar y eliminar filas desde la UI.
 * - La base de datos utilizada para demostración es un archivo db.json (simulado con json-server).
 * - Las operaciones de agregar, editar y eliminar se hacen mediante peticiones HTTP (fetch) a la API REST local.
 * - Para conectar a un SQL Server real, se debe reemplazar la API REST por un backend (Node.js, .NET, etc.) que interactúe con SQL Server y exponga endpoints equivalentes.
 * - El modo oscuro se aplica a toda la vista y a los controles.
 *
 * Ejemplo base toerico de DJANGO para conexión a SQL Server (Esto es mera suposición, no está implementado ni probado):
 *
 * # settings.py
 * DATABASES = {
 *     'default': {
 *         'ENGINE': 'django.db.backends.sql_server.pyodbc',
 *         'NAME': 'nombre_bd',
 *         'USER': 'usuario',
 *         'PASSWORD': 'contraseña',
 *         'HOST': 'localhost',
 *         'PORT': '',
 *         'OPTIONS': {
 *             'driver': 'ODBC Driver 17 for SQL Server',
 *         },
 *     }
 * }
 *
 * # models.py
 * from django.db import models
 * class Periodico(models.Model):
 *     estado = models.CharField(max_length=100)
 *     año = models.IntegerField()
 *     mes = models.CharField(max_length=20)
 *     # ...otros campos...
 *
 * # views.py (ejemplo de endpoint)
 * from django.http import JsonResponse
 * from .models import Periodico
 * def periodicos_list(request):
 *     data = list(Periodico.objects.all().values())
 *     return JsonResponse(data, safe=False)
 */
export function Body() {
  const {stateName} = useParams();
  const { isDarkMode } = useOutletContext?.() || {};
  const navigate = useNavigate(); // <-- Hook para la navegación

  // ... (el estado de columnDefs y rowData se mantiene igual)
    const [columnDefs, setColumnDefs] = useState([
     {
    headerClass:'actions-column-header',
    width: 80,
    cellRenderer: DeleteButtonRenderer, // Use our new component
    cellRendererParams: {
      handleDelete: deleteRow, // Pass the deleteRow function to the button component
    },
    suppressMenu: true,
    suppressColumnsToolPanel: true,
    sortable: false,
    filter: false,
    editable: false,
    resizable: false,
    suppressMovable: true,
    lockPosition: 'left',
    enableRowGroup: false
  },
    { field: 'estado', headerName: 'Entidad', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'AÑO', headerName: 'Año', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'MES', headerName: 'Mes', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'Dia', headerName: 'Dia', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'num_periodico', headerName: 'Núm. Periódico', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'seccion', headerName: 'Sección', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'falta_po', headerName: 'Falta PO Impresión', enableRowGroup: true, enableValue: true, width: 150 },
    { field: 'tomo', headerName: 'Tomo', filter: true, enableRowGroup: true, enablePivot: true, width: 100 },
    { field: 'turno', headerName: 'Turno', filter: true, enableRowGroup: true, enablePivot: true, width: 100 },
    { field: 'ordenamiento', headerName: 'Ordenamiento', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'id_SILS', headerName: 'ID SIL', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'fecha_ingreso_cdaacl', headerName: 'Fecha CDAACL', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'fecha_ingreso_departamento', headerName: 'Fecha Depto.', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'hora_departamento', headerName: 'Hora de ingreso al depto.', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'fecha_consulta_web', headerName: 'Fecha Web', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'hora_consult_web', headerName: 'Hora de consulta web', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'observaciones', headerName: 'Observaciones', filter: true, enableRowGroup: true, enablePivot: true, width: 200 },
    { field: 'mes_informe', headerName: 'Mes Informe', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'PDF', headerName: 'PDF', filter: true, enableRowGroup: true, enablePivot: true, width: 80 },
    { field: 'Validez', headerName: 'Validez', filter: true, enableRowGroup: true, enablePivot: true, width: 80 },
  
  ]);
  const [rowData, setRowData] = useState([]);
  // ... (useEffect, addRow, deleteRow, handleCellValueChanged se mantienen igual)

  useEffect(() => {
    // If there's no stateName in the URL, don't fetch anything.
    if (!stateName) {
      setRowData([]); // Clear the table
      return;
    }

    // Construct the API URL to fetch data for the specific state
    const apiUrl = `http://localhost:3001/periodicos?estado=${encodeURIComponent(stateName)}`;

    console.log(`Fetching data for: ${stateName}`); // For debugging

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setRowData(data); // Update the table with the fetched data
      })
      .catch(error => console.error('Error fetching data:', error));

  }, [stateName]); // The hook dependency array ensures this runs when stateName changes

const addRow = async () => {
  if (!stateName) {
    alert("Por favor, seleccione un estado antes de agregar una fila.");
    return;
  }

  const newRow = {
    estado: stateName, AÑO: '', MES: '', Dia: '', num_periodico: "", seccion: "", falta_po: "", tomo: "", turno: "", ordenamiento: "", id_SILS: "", fecha_ingreso_cdaacl: "", fecha_ingreso_departamento: "", hora_departamento: "", fecha_consulta_web: "", hora_consult_web: "", observaciones: "", mes_informe: "", PDF: "NO", Validez: "Electrónica"
  };

  try {
    const response = await fetch('http://localhost:3001/periodicos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRow),
    });

    // Check if the server responded with an error code (like 404 or 500)
    if (!response.ok) {
      throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
    }

    const savedRow = await response.json();
    setRowData(prevRowData => [...prevRowData, savedRow]);

  } catch (error) {
    // This will now catch network errors (like server not running) and server errors.
    console.error("No se pudo agregar la fila:", error);
    alert(`Error al guardar los datos. Por favor, asegúrese de que el servidor esté corriendo y verifique la consola para más detalles.\n\nError: ${error.message}`);
  }
};
 async function deleteRow(idToDelete) {
    try {
      const response = await fetch(`http://localhost:3001/periodicos/${idToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete the row on the server.");
      }
      setRowData(prevRowData => prevRowData.filter(row => row.id !== idToDelete));
      console.log(`Successfully deleted row with ID: ${idToDelete}`);
    } catch (error) {
      console.error("Error deleting row:", error);
      alert(`Error deleting row: ${error.message}`);
    }
  }

const handleCellValueChanged = useCallback(async (event) => {
    console.log("Cell Value Changed:", event.data);
    const updatedRow = event.data;

    try {
      // Send the updated row data to the server using a PUT request.
      // The ID of the row is used in the URL to specify which record to update.
      const response = await fetch(`http://localhost:3001/periodicos/${updatedRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRow),
      });

      if (!response.ok) {
        throw new Error("Failed to update the row on the server.");
      }

      console.log("Update successful!");

    } catch (error) {
      console.error("Error updating row:", error);
      // Here you could add logic to revert the change in the UI if the server update fails.
    }
}, []);
  return (
    <div style={{...gridContainerStyle, backgroundColor: isDarkMode ? scjnBlack : scjnWhite }}>
      {/* ... (el bloque <style> se mantiene igual) */}
       <style>{`
        body.dark-mode-active { background-color: ${scjnDarkBlue}; color: ${scjnOffWhite}; }
        body.light-mode-active { background-color: ${scjnWhite}; color: ${scjnBlack}; }
        .controls-container label { color: ${isDarkMode ? scjnOffWhite : scjnBlack}; }
        .controls-container button { 
          background-color: ${isDarkMode ? scjnLightBlue : scjnDarkBlue}; 
          color: ${isDarkMode ? scjnBlack : scjnWhite}; 
          border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;
          margin: 5px;
        }
        .controls-container button:hover {
          opacity: 0.8;
        }
        .ag-header-cell-label {
          justify-content: center;
        }
        .ag-cell {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .actions-column-header .ag-header-cell-menu-button {
        display: none !important;
        }
      `}</style>
      <div className="controls-container" style={{ 
        marginBottom: '20px', 
        width: '95%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <button
          onClick={() => navigate('/consulta/lista-estados')}
          className="flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Regresar
        </button>
        <button type="button" onClick={addRow}>Agregar Fila</button>
      </div>
      
      <div style={{ height: '80vh', width: '95%' }}>
        <AgGridTable
          isDarkMode={isDarkMode}
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={handleCellValueChanged}
        />
      </div>
    </div>
  );
}