import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import { createRef } from 'react';
import './ResGrid.css';
import Modal from './Modal';

const columns = [
    { 
        name: "date"
        , header: "DATE" 
        , align: 'center'
        , formatter: ({row}) => {
            return row.date.substring(0,4) +'-'+ row.date.substring(4,6) +'-'+ row.date.substring(6,8);
        }
    }, { 
        name: "empName"
        , header: "NAME" 
        , align: 'center'
    }, { 
        name: "amt"
        , header: "AMT" 
        , align: 'right'
        , formatter: ({row}) => {
            return row.amt + ' 원';
        }
    }
];
const summary = {
    height: 40,
    position: 'bottom', // or 'top'
    columnContent: {
        amt: {
            template: function(valueMap) {
                return `합계: ${valueMap.sum} 원`;
            }
        }
    }
}

function ResGrid({_data}) {
    let gridRef = createRef();

    const test = () => {
        console.log( gridRef.current.getInstance().getRow(gridRef.current.getInstance().getFocusedCell().rowKey) ); // getSelectedRow() 와 같음.
    }

    return (
        <>
            <div className='btnBox'>
                <input id='btnAddPop' className='btn' type='button' value="ADD" onClick={test} />
                <input id='btnModPop' className='btn' type='button' value="MODIFY" onClick={test} />
            </div>
            <div className='content'>
                <Grid
                    ref={gridRef}
                    id='content'
                    data={_data}
                    columns={columns}
                    summary={summary}
                    rowHeight={25}
                    bodyHeight={"fitToParent"}
                    heightResizable={false}
                    rowHeaders={["rowNum"]}
                />
            </div>
            <Modal/>
        </>
    );
  }
  
  export default ResGrid;