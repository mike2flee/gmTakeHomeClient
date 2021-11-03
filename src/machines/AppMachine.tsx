import {createMachine} from 'xstate'

type AppEvents = GetAllTimeSheetData;

interface AppMachineContextProps {
    timeSheetData: any
}

const intialContext: AppMachineContextProps = {
    timeSheetData: {}
}

const appMachine = createMachine<AppMachineContextProps, AppEvents>({
    id: 'appMachine',
    initial:'idle',
    context: intialContext,
    states:{
        idle:{}
    }
})

export default appMachine;

type GetAllTimeSheetData = {type: 'GET_ALL_TIMESHEET_DATA'};
