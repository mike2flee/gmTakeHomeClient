import { createMachine, assign, DoneEvent } from "xstate";
import { toast } from "react-toastify";
import { fetchJson } from "../shared/fetchJson";
import { formatCurrency } from "../shared/utils";

type AppEvents =
  | GetAllTimeSheetData
  | FindByClientName
  | ClosingModal
  | ToggleModal
  | UpdateCreateForm
  | CreateClientInstance
  | GetAll
  | TogglePrivateMode;

interface AppMachineContextProps {
  timeSheetData: any;
  isModalOpen: boolean;
  modalData?: any;
  modalTitle: String;
  shouldReset?: boolean;
  privateMode: boolean;
  totalBillableAmount: String;
  totalHoursTracked: String;
}

const intialContext: AppMachineContextProps = {
  isModalOpen: false,
  modalTitle: "",
  shouldReset: false,
  privateMode: false,
  totalBillableAmount: "$-",
  totalHoursTracked: "-",
  modalData: {},
  timeSheetData: [],
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
          CREATE_NEW_INSTANCE: {
            target: "creatingNewClient",
          },
          GET_ALL: {
            target: "fetchingData",
            actions: ["togglePrivateMode"],
          },
          TOGGLE_PRIVATE_MODE: {
            actions: ["togglePrivateMode"],
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
            target: "idle",
            actions: ["setClientInstance"],
          },
          onError: {
            target: "idle",
            actions: ["flashError"],
          },
        },
      },
      creatingNewClient: {
        invoke: {
          src: "creatingNewClientRow",
          onDone: {
            target: "fetchingData",
            actions: ["toggleModal"],
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
      creatingNewClientRow: (context, event) => {
        const { request } = event as CreateClientInstance;
        return fetchJson("http://localhost:8080/timesheetApi/create", {
          method: "POST",
          body: JSON.stringify({ clientInstance: request }),
        });
      },
    },
    actions: {
      setClientInstance: assign((context, event) => {
        let totalBillableAmount = 0;
        let totalHoursTracked = 0;
        const formattedClientInstances: any = [];
        const e = event as DoneEvent;
        e.data.clientInstancePojoList.forEach((instance: any) => {
          if (instance.isBillable === "Yes") {
            instance.billableHours = instance.hours;
            instance.billableAmount = `$ ${formatCurrency(
              parseFloat(instance.hours) * parseFloat(instance.billingRate)
            )}`;
            totalHoursTracked += parseFloat(instance.hours);
            totalBillableAmount +=
              parseFloat(instance.hours) * parseFloat(instance.billingRate);
          } else {
            instance.billableHours = "0";
            instance.billableAmount = "_";
          }
          formattedClientInstances.push(instance);
        });
        return {
          ...context,
          timeSheetData: formattedClientInstances,
          shouldReset: false,
          totalBillableAmount: `$ ${formatCurrency(totalBillableAmount)}`,
          totalHoursTracked: `${formatCurrency(totalHoursTracked)}`,
        };
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
      togglePrivateMode: assign((context, event) => {
        const { privateMode, strict } = event as TogglePrivateMode;
        const reducePrivateBool = strict ? privateMode : false;
        return { ...context, privateMode: reducePrivateBool };
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

type CreateClientInstance = {
  type: "CREATE_NEW_INSTANCE";
  request: { clientInstance: any };
};

type GetAll = { type: "GET_ALL" };

type TogglePrivateMode = {
  type: "TOGGLE_PRIVATE_MODE";
  privateMode?: boolean;
  strict?: boolean;
};
