import {createMachine, assign, DoneEvent} from 'xstate'
import { fetchJson } from '../shared/fetchJson';

type AppEvents = GetAllTimeSheetData;

interface AppMachineContextProps {
    timeSheetData: any
}

const intialContext: AppMachineContextProps = {
    timeSheetData: {}
}

const appMachine = createMachine<AppMachineContextProps, AppEvents>({
    id: 'appMachine',
    initial:'fetchingData',
    context: intialContext,
    states:{
        idle:{},
        fetchingData: {
            invoke:{
                src:'getAllClientInstances',
                onDone:{
                    target: 'idle',
                    actions: 'setClientInstance'
                },
                onError:''
            }
        },
        failed:{

        }
    }
},{
    services: {
        getAllClientInstances: () => fetchJson('http://localhost:8080/timesheetApi/getAll')
    },
    actions:{
        setClientInstance: assign((context, event) => {
            const e = event as DoneEvent;
            return{...context, timeSheetData: e.data.clientInstancePojoList}
        })  
    }
})

export default appMachine;

type GetAllTimeSheetData = {type: 'GET_ALL_TIMESHEET_DATA'};
