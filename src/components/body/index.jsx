import { useState, useEffect, useCallback } from 'react';
import { AgGridTable } from '../table';
import { useParams } from 'react-router-dom';
import { DeleteButtonRenderer } from '../buttons/deletebutton';

// SCJN Institutional Colors (from guide)
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

export function Body() {
  const {stateName} = useParams(); // Get the state name from the URL parameters
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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

  const applyDarkModePreference = useCallback((enabled) => {
    document.body.dataset.agThemeMode = enabled ? "dark-scjn" : "light-scjn";
    if (enabled) {
      document.body.classList.add('dark-mode-active');
      document.body.classList.remove('light-mode-active');
    } else {
      document.body.classList.add('light-mode-active');
      document.body.classList.remove('dark-mode-active');
    }
  }, []);

  useEffect(() => {
    applyDarkModePreference(isDarkMode);
  }, [isDarkMode, applyDarkModePreference]);

  useEffect(() => {
    applyDarkModePreference(isDarkMode); 
  }, []); 



  return (
    <div 
    style={{...gridContainerStyle, backgroundColor: isDarkMode ? scjnBlack : scjnWhite }}>
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
        maxWidth: 'none', // Permite que los controles ocupen más espacio
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '10px' 
      }}>
        <div>
          <label>
            Dark Mode (SCJN Colors):{" "}
            <input type="checkbox" checked={isDarkMode} onChange={(e) => setIsDarkMode(e.target.checked)} />
          </label>
        </div>
        <div>
          <button type="button" onClick={(e) => {e.preventDefault(); addRow();}}>Agregar Fila</button>
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
  </div>
    
    
  );
}