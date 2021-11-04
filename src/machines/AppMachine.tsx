import { createMachine, assign, DoneEvent } from "xstate";
import { toast } from "react-toastify";
import { fetchJson } from "../shared/fetchJson";

type AppEvents =
  | GetAllTimeSheetData
  | FindByClientName
  | ClosingModal
  | ToggleModal
  | UpdateCreateForm;

interface AppMachineContextProps {
  timeSheetData: any;
  isModalOpen: boolean;
  modalData?: any;
  modalTitle: String;
}

const intialContext: AppMachineContextProps = {
  timeSheetData: {},
  isModalOpen: false,
  modalData: {},
  modalTitle: "",
};

const appMachine = createMachine<AppMachineContextProps, AppEvents>(
  {
    id: "appMachine",
    initial: "fetchingData",
    context: intialContext,

    states: {
      idle: {
        on: {
          TOGGLE_MODAL: { actions: ["toggleModal"] },
          UPDATE_CREATE_FORM: { actions: ["updateCreateForm"] },
          FIND_BY_CLIENT_NAME: {
            target: "findingByClient",
          },
        },
      },
      fetchingData: {
        invoke: {
          src: "getAllClientInstances",
          onDone: {
            target: "idle",
            actions: ["setClientInstance", "flashSuccess"],
          },
          onError: {
            target: "idle",
            actions: "flashError",
          },
        },
      },
      findingByClient: {
        invoke: {
          src: "findClientByName",
          onDone: {
            target: "fetchingData",
          },
          onError: {
            target: "idle",
            actions: ["flashError"],
          },
        },
      },
      failed: {},
    },
  },
  {
    services: {
      getAllClientInstances: () =>
        fetchJson("http://localhost:8080/timesheetApi/getAll"),
      findClientByName: (context, event) => {
        const { request } = event as FindByClientName;
        return fetchJson("http://localhost:8080/timesheetApi/findByClient", {
          method: "POST",
          body: JSON.stringify(request),
        });
      },
    },
    actions: {
      setClientInstance: assign((context, event) => {
        const e = event as DoneEvent;
        return { ...context, timeSheetData: e.data.clientInstancePojoList };
      }),
      flashError: (context, event) => {
        const e = event as DoneEvent;
        console.log("ERROR");
        toast.error(e.data.message);
      },
      flashSuccess: (context, event) => {
        const e = event as DoneEvent;
        toast.success(e.data.statusMessage);
      },
      toggleModal: assign((context, event) => {
        const e = event as ToggleModal;
        return {
          ...context,
          isModalOpen: !context.isModalOpen,
          modalData: e.modalData,
          modalTitle: e.title,
        };
      }),
      updateCreateForm: assign((context, event) => {
        const { field, value } = event as UpdateCreateForm;
        const updatedData = { ...context.modalData, [`${field}`]: value };
        return { ...context, modalData: updatedData };
      }),
    },
  }
);

export default appMachine;

type GetAllTimeSheetData = { type: "GET_ALL_TIMESHEET_DATA" };

type FindByClientName = {
  type: "FIND_BY_CLIENT_NAME";
  request: { clientName: String };
};

type ClosingModal = { type: "CLOSE" };

type ToggleModal = { type: "TOGGLE_MODAL"; modalData: any; title: String };

type UpdateCreateForm = {
  type: "UPDATE_CREATE_FORM";
  field: String;
  value: any;
};
