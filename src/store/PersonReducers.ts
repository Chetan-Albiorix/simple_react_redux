import Person from "../models/Person";
import { v4 as uuidv4 } from "uuid";

export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

export type PersonState = {
  personList: Person[];
};

// initial state value for person state 
const initialState: PersonState = {
  personList: [
    {
      id: uuidv4(),
      name: "Chetan Chudasama",
      email: "chetan.chudasama@gmail.com",
      mobileNo: "+91 9714596263",
      gender: "Male",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      name: "Rakesh Makwana",
      email: "chetan.chudasama@gmail.com",
      mobileNo: "+91 9714596263",
      gender: "Male",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      name: "Kishan Joliya",
      email: "chetan.chudasama@gmail.com",
      mobileNo: "+91 9714596263",
      gender: "Male",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      name: "Mahesh Makwana",
      email: "chetan.chudasama@gmail.com",
      mobileNo: "+91 9714596263",
      gender: "Male",
      isStarred: false,
      isDeleted: false,
    },
    {
      id: uuidv4(),
      name: "Ron Makwana",
      email: "chetan.chudasama@gmail.com",
      mobileNo: "+91 9714596263",
      gender: "Male",
      isStarred: false,
      isDeleted: false,
    },
  ],
};

export const addStarredPersonRecord = (isStarred: boolean, id: string) => {
  return typedAction("ADD_STARRED_PERSON_RECORD", { isStarred, id });
};

export const deletePersonRecord = (id: string) => {
  return typedAction("DELETE_PERSON_RECORD", { id });
};

export const restorePersonRecord = (id: string) => {
  return typedAction("RESTORE_PERSON_RECORD", { id });
};

type PersonAction = ReturnType<
  | typeof addStarredPersonRecord
  | typeof deletePersonRecord
  | typeof restorePersonRecord
>;

export function personReducers(
  state = initialState,
  action: PersonAction
): PersonState {
  switch (action.type) {
    case "ADD_STARRED_PERSON_RECORD":
      const personListTemp = [...state.personList];
      const index = personListTemp.findIndex(
        (person) => person.id === action.payload.id
      );
      if (index !== -1) {
        personListTemp[index].isStarred = action.payload.isStarred;
      }
      return { ...state, personList: personListTemp };

    case "DELETE_PERSON_RECORD":
      const personListT = [...state.personList];
      const itemIndex = personListT.findIndex(
        (person) => person.id === action.payload.id
      );
      if (itemIndex !== -1) {
        personListT[itemIndex].isDeleted = true;
        if (personListT[itemIndex].isStarred) {
          personListT[itemIndex].isStarred = false;
        }
      }
      return { ...state, personList: personListT };

    case "RESTORE_PERSON_RECORD":
      const personListTT = [...state.personList];
      const indexValue = personListTT.findIndex(
        (person) => person.id === action.payload.id
      );
      if (indexValue !== -1) {
        personListTT[indexValue].isDeleted = false;
      }
      return { ...state, personList: personListTT };
    default:
      return state;
  }
}
