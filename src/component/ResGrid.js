import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import { createRef, useState } from 'react';
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
    const [state, setState] = useState({
        showYn: ''
        , rowInfo: {}
    });

    let gridRef = createRef();
    const showModal = (type) => {
        const typeMap = {
            'ADD': {}
            , 'MOD': {...gridRef.current.getInstance().getRow(gridRef.current.getInstance().getFocusedCell().rowKey)}
        }
        const rowInfo = typeMap[type];
        if(!rowInfo.empName && type === 'MOD') {
            alert('청구서를 선택하세요.');
            return;
        }
        console.log(rowInfo.empName);
        setState({
            showYn: 'show'
            , rowInfo: {
                date: rowInfo.date
                , empName: rowInfo.empName
                , amt: rowInfo.amt
            }
        });
    }

    const closeModal = () => {
        setState({showYn: '', rowInfo: {}});
    }

    return (
        <>
            <div className='btnBox'>
                <input 
                    id='btnAddPop' 
                    className='btn' 
                    type='button' 
                    value="ADD" 
                    onClick={() => showModal('ADD')}
                />
                <input 
                    id='btnModPop' 
                    className='btn' 
                    type='button' 
                    value="MODIFY" 
                    onClick={() => showModal('MOD')}
                />
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
            <Modal showYn={state.showYn} closeModal={closeModal} rowInfo={state.rowInfo} />
        </>
    );
  }
  
  export default ResGrid;