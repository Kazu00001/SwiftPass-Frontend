// export const requests = [
//   { "id": "T001", "date": "04/11/25", "status": 2 },
//   { "id": "T002", "date": "03/11/25", "status": 1 },
//   { "id": "T003", "date": "02/11/25", "status": 2 },
//   { "id": "T004", "date": "01/11/25", "status": 1 },
//   { "id": "T005", "date": "31/10/25", "status": 1 },
//   { "id": "T006", "date": "30/10/25", "status": 2 },
//   { "id": "T007", "date": "29/10/25", "status": 2 },
//   { "id": "T008", "date": "28/10/25", "status": 1 },
//   { "id": "T009", "date": "27/10/25", "status": 2 },
//   { "id": "T010", "date": "26/10/25", "status": 1 },
//   { "id": "T011", "date": "25/10/25", "status": 2 },
//   { "id": "T012", "date": "24/10/25", "status": 1 },
//   { "id": "T013", "date": "23/10/25", "status": 2 },
//   { "id": "T014", "date": "22/10/25", "status": 1 },
//   { "id": "T015", "date": "21/10/25", "status": 2 },
//   { "id": "T016", "date": "20/10/25", "status": 1 },
//   { "id": "T017", "date": "19/10/25", "status": 1 },
//   { "id": "T018", "date": "18/10/25", "status": 2 },
//   { "id": "T019", "date": "17/10/25", "status": 2 },
//   { "id": "T020", "date": "16/10/25", "status": 1 }
// ];
 import { API_URL } from "../../../../../utils/env";
 import { httpclientplugin_requestAttendanceData } from "../../../../../Plugins/index.js";


export const getRequestById = (id) => { 
  try {
    const url= `${API_URL}/api/teachers/${id}/records`;
    const requests = httpclientplugin_requestAttendanceData.getHistory(url);
    return requests;
  } catch (error) {
    console.error('Error fetching requests data:', error);
    return [];
    
  }
}