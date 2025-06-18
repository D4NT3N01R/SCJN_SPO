import { useState, useEffect, useCallback } from 'react';
import { AgGridTable } from '../table';

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
  justifyContent: 'flex-start', // Cambiado a flex-start para mejor uso del espacio
  alignItems: 'center',
  padding: '20px',
  minHeight: 'calc(100vh - 40px)',
  boxSizing: 'border-box',
  width: '100%', // Asegura que ocupe todo el ancho disponible
};

export function Body() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [columnDefs, setColumnDefs] = useState([
    { field: 'estado', headerName: 'Entidad', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'fecha_publi', headerName: 'Fecha Publicación', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'num_paper', headerName: 'Núm. Periódico', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'seccion', headerName: 'Sección', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'falta_po', headerName: 'Falta PO Impresión', enableRowGroup: true, enableValue: true, width: 150 },
    { field: 'tomo', headerName: 'Tomo', filter: true, enableRowGroup: true, enablePivot: true, width: 100 },
    { field: 'turno', headerName: 'Turno', filter: true, enableRowGroup: true, enablePivot: true, width: 100 },
    { field: 'ordenamiento', headerName: 'Ordenamiento', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'id_SILS', headerName: 'ID SIL', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'fecha_CDAACL', headerName: 'Fecha CDAACL', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'fecha_dep', headerName: 'Fecha Depto.', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'fecha_web', headerName: 'Fecha Web', filter: true, enableRowGroup: true, enablePivot: true, width: 150 },
    { field: 'observaciones', headerName: 'Observaciones', filter: true, enableRowGroup: true, enablePivot: true, width: 200 },
    { field: 'mes_informe', headerName: 'Mes Informe', filter: true, enableRowGroup: true, enablePivot: true, width: 120 },
    { field: 'pdf_bit', headerName: 'PDF', filter: true, enableRowGroup: true, enablePivot: true, width: 80 },
  ]);

  const [rowData, setRowData] = useState([
    // Datos de ejemplo con las nuevas columnas
    { 
      estado: 'Ciudad de México', 
      fecha_publi: '2023-01-15', 
      num_paper: '12345', 
      seccion: 'Judicial', 
      falta_po: 'No', 
      tomo: 'IV', 
      turno: 'Matutino', 
      ordenamiento: 'Orden 123', 
      id_SILS: 'SIL-2023-001', 
      fecha_CDAACL: '2023-01-10', 
      fecha_dep: '2023-01-12', 
      fecha_web: '2023-01-16', 
      observaciones: 'Sin observaciones', 
      mes_informe: 'Enero', 
      pdf_bit: 'Sí' 
    },
    // Más filas de ejemplo...
  ]);

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

  const handleCellValueChanged = useCallback((event) => {
    console.log("Cell Value Changed:", event.data);
  }, []);

  const addRow = () => {
    const newRow = {
      estado: 'Nuevo León', 
      fecha_publi: '2023-02-20', 
      num_paper: '54321', 
      seccion: 'Administrativo', 
      falta_po: 'Sí', 
      tomo: 'V', 
      turno: 'Vespertino', 
      ordenamiento: 'Orden 456', 
      id_SILS: 'SIL-2023-002', 
      fecha_CDAACL: '2023-02-15', 
      fecha_dep: '2023-02-18', 
      fecha_web: '2023-02-21', 
      observaciones: 'Revisar documento', 
      mes_informe: 'Febrero', 
      pdf_bit: 'No' 
    };
    setRowData(prevRowData => [...prevRowData, newRow]);
  };

  return (
    <div style={{...gridContainerStyle, backgroundColor: isDarkMode ? scjnBlack : scjnWhite }}>
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
          <button onClick={addRow}>Agregar Fila</button>
        </div>
      </div>
      <AgGridTable 
        isDarkMode={isDarkMode}
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={handleCellValueChanged}
      />
    </div>
  );
}