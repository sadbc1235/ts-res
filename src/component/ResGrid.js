import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import { createRef, useState } from 'react';
import './ResGrid.css';
import Modal from './Modal';

function fnGetCurrencyCode(value) {
    if (!value) {
        return '';
    } else {
        return ('' + value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

const columns = [
    { 
        name: "date"
        , header: "DATE" 
        , align: 'center'
        , formatter: ({row}) => {
            return row.date.substring(0,4) +'-'+ row.date.substring(4,6) +'-'+ row.date.substring(6,8);
        }
    }, { 
        name: "name"
        , header: "NAME" 
        , align: 'center'
    }, { 
        name: "amt"
        , header: "AMT" 
        , align: 'right'
        , formatter: ({row}) => {
            return fnGetCurrencyCode(row.amt) + ' 원';
        }
    }
];
const summary = {
    height: 40,
    position: 'bottom', // or 'top'
    columnContent: {
        amt: {
            template: function(valueMap) {
                return `합계: ${fnGetCurrencyCode(valueMap.sum)} 원`;
            }
        }
    }
}

function ResGrid({_data, fnSelectResList}) {
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
        if(!rowInfo.name && type === 'MOD') {
            alert('청구서를 선택하세요.');
            return;
        }
        setState({
            showYn: 'show'
            , rowInfo: {
                date: rowInfo.date
                , name: rowInfo.name
                , amt: rowInfo.amt
                , res_seq: rowInfo.res_seq
                , type: type
            }
        });
    }

    const closeModal = () => {
        setState({showYn: '', rowInfo: {}});
        fnSelectResList();
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