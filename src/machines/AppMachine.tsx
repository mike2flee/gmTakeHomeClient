import {createMachine, assign, DoneEvent} from 'xstate'
import {  toast } from 'react-toastify';
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
                    actions: ['setClientInstance', 'flashSuccess']
                },
                onError:{
                    target: 'idle',
                    actions: 'flashSuccess'
                }
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
        }),
        flashError: ((context, event) => {
            const e = event as DoneEvent;
            toast.error(e.data.statusMessage)
        }),
        flashSuccess: ((context, event) => {
            const e = event as DoneEvent;
            toast.success(e.data.statusMessage)
        })
    }
})

export default appMachine;

type GetAllTimeSheetData = {type: 'GET_ALL_TIMESHEET_DATA'};
