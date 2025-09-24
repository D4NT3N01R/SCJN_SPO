import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';

// SCJN Institutional Colors
const scjnBlack = "#1D1D1B";
const scjnDarkBlue = "#003A70";
const scjnLightBlue = "#7DA1C4";
const scjnDarkGreen = "#28724F";
const scjnGreen = "#6CC24A";
const scjnYellowOrange = "#EAAA00";
const scjnOrangeRed = "#E04E39";
const scjnMagenta = "#C5299B";
const scjnPurple = "#8246AF";
const scjnWarmGray = "#D1CCBD";
const scjnCoolGray = "#BFCED6";
const scjnWhite = "#FFFFFF";
const scjnOffWhite = "#F7F9FC";
const scjnLightGray = "#EAEAEA";

// Define custom AG Grid theme
const myGridTheme = themeQuartz
  .withParams(
    { // Light Mode
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: scjnWhite,
      foregroundColor: scjnBlack,
      headerBackgroundColor: scjnLightGray,
      headerTextColor: scjnBlack,
      oddRowBackgroundColor: scjnOffWhite,
      borderColor: scjnWarmGray,
      toolPanelBackgroundColor: scjnLightGray,
      cellHoverBackgroundColor: scjnCoolGray,
      accentColor: scjnDarkBlue,
    }, "light-scjn")
  .withParams(
    { // Dark Mode
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: scjnBlack,
      foregroundColor: scjnOffWhite,
      headerBackgroundColor: scjnBlack,
      headerTextColor: scjnWhite,
      borderColor: scjnLightBlue,
      toolPanelBackgroundColor: scjnBlack,
      cellHoverBackgroundColor: scjnDarkBlue,
      accentColor: scjnMagenta,
    }, "dark-scjn");

// Register modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Grid wrapper styles
const gridWrapperStyle = {
  flex: '1 1 auto',
  height: '100%',
  width: '100%',
  
};

/**
 * Componente AgGridTable
 *
 * - Renderiza una tabla usando AG Grid con soporte para modo claro y oscuro.
 * - Aplica colores institucionales SCJN en ambos modos.
 * - Recibe datos, columnas y callback para cambios en celdas.
 * - Permite ordenar, filtrar, editar y agrupar columnas.
 * - Incluye panel lateral para columnas y filtros.
 * - Centra el contenido de celdas y encabezados.
 * - El modo oscuro se aplica con la clase 'dark-scjn', el claro con 'light-scjn'.
 */
export const AgGridTable = ({ 
  isDarkMode, 
  rowData, 
  columnDefs, 
  onCellValueChanged 
}) => {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
    wrapText: true,
    cellStyle: { 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerClass: 'ag-header-cell-center'
  }), []);

  return (
    <div 
      style={gridWrapperStyle} 
      className={`ag-theme-quartz ${isDarkMode ? 'dark-scjn' : 'light-scjn'}`}
    >
      <style>{`
        /* Estilos generales para el grid */
        .ag-theme-quartz.light-scjn {
          --ag-foreground-color: ${scjnBlack};
          --ag-background-color: ${scjnWhite};
          --ag-header-background-color: ${scjnLightGray};
          --ag-row-hover-color: ${scjnCoolGray};
          --ag-border-color: ${scjnWarmGray};
        }
        
        .ag-theme-quartz.dark-scjn {
          --ag-foreground-color: ${scjnOffWhite};
          --ag-background-color: ${scjnBlack};
          --ag-header-background-color: ${scjnBlack};
          --ag-row-hover-color: ${scjnDarkBlue};
          --ag-border-color: ${scjnLightBlue};
        }
        
        /* Centrar contenido de celdas y encabezados */
        .ag-header-cell-center .ag-header-cell-label {
          justify-content: center;
        }
        
        /* Estilo para el panel lateral */
        .ag-side-bar {
          background: ${isDarkMode ? scjnBlack : scjnLightGray} !important;
        }
        
        /* Estilo para los checkboxes */
        .ag-checkbox-input-wrapper {
          border-radius: 4px;
          border: 1px solid ${isDarkMode ? scjnLightBlue : scjnDarkBlue};
        }
      `}</style>
      
       {/* AgGridReact component */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onCellValueChanged={onCellValueChanged}
        sideBar={{
          toolPanels: [
            {
              id: 'columns',
              labelDefault: 'Columnas',
              labelKey: 'columns',
              iconKey: 'columns',
              toolPanel: 'agColumnsToolPanel',
              toolPanelParams: {
                suppressRowGroups: false,
                suppressValues: false,
                suppressPivots: false,
                suppressPivotMode: false,
                suppressColumnFilter: false,
                suppressColumnSelectAll: false,
                suppressColumnExpandAll: false,
                suppressMenuHide:false
              },
            },
            {
              id: 'filters',
              labelDefault: 'Filtros',
              labelKey: 'filters',
              iconKey: 'filter',
              toolPanel: 'agFiltersToolPanel',
            },
          ],
          defaultToolPanel: 'columns',
        }}
        // pivotMode={true}
        rowGroupPanelShow={'always'}
        pivotPanelShow={'always'}
        suppressHorizontalScroll={false}
        
        headerHeight={40}
        rowHeight={35}
        suppressColumnVirtualisation={true}
      />
    </div>
  );
};