import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import { toast } from 'react-toastify'

const getAllLogs = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/logs/all`, {
      withCredentials: true,
    })

    const fakeLogs = [
      {
        eventTime: '2023-01-15 10:23:45',
        logContent:
          "New house created for customer Dene Tha', with NPL 123456 and model No. 321-654",
        eventType: 'New house',
      },
      {
        eventTime: '2023-01-28 12:45:30',
        logContent: 'New customer added: John',
        eventType: 'New customer',
      },
      {
        eventTime: '2023-02-10 09:15:21',
        logContent:
          'House with NPL 123456 started for customer Fang. The model No. is 321-654',
        eventType: 'House started',
      },
      {
        eventTime: '2023-02-25 11:32:15',
        logContent:
          'House with NPL 654321 completed for customer Fang. The model No. is 789-123',
        eventType: 'House completed',
      },
      {
        eventTime: '2023-03-05 14:22:37',
        logContent:
          'Defect created for house 654321 in Bay 2 , and the house model is 789-123',
        eventType: 'Defect created',
      },
      {
        eventTime: '2023-03-18 16:18:12',
        logContent:
          'Defect fixed for house with NPL 654321 in Bay 2 , and the house model is 789-123',
        eventType: 'Defect fixed',
      },
      {
        eventTime: '2023-04-03 08:45:56',
        logContent:
          'New house created for customer Whitefish, with NPL 987654 and model No. 456-789',
        eventType: 'New house',
      },
      {
        eventTime: '2023-04-19 13:22:47',
        logContent: 'New customer added: Alice',
        eventType: 'New customer',
      },
      {
        eventTime: '2023-05-10 11:08:54',
        logContent:
          'House with NPL 987654 started for customer Whitefish. The model No. is 456-789',
        eventType: 'House started',
      },
      {
        eventTime: '2023-05-23 15:29:33',
        logContent:
          'House with NPL 789123 completed for customer Conklin. The model No. is 012-345',
        eventType: 'House completed',
      },
      {
        eventTime: '2023-06-01 09:50:21',
        logContent:
          'Defect created for house 789123 in Bay 3 , and the house model is 012-345',
        eventType: 'Defect created',
      },
      {
        eventTime: '2023-06-15 17:18:45',
        logContent:
          'Defect fixed for house with NPL 789123 in Bay 3 , and the house model is 012-345',
        eventType: 'Defect fixed',
      },
      {
        eventTime: '2023-07-05 12:30:11',
        logContent:
          'New house created for customer Conklin, with NPL 246810 and model No. 654-321',
        eventType: 'New house',
      },
      {
        eventTime: '2023-07-21 16:05:37',
        logContent: 'New customer added: Robert',
        eventType: 'New customer',
      },
      {
        eventTime: '2023-08-14 10:55:20',
        logContent:
          'House with NPL 246810 started for customer Compton. The model No. is 654-321',
        eventType: 'House started',
      },
      {
        eventTime: '2023-08-30 14:45:00',
        logContent:
          "House with NPL 369258 completed for customer Dene Tha'. The model No. is 987-654",
        eventType: 'House completed',
      },
      {
        eventTime: '2023-09-09 13:15:42',
        logContent: 'Defect created for house with NPL 369258 in Bay 4, and the house model is 987-654',
        eventType: 'Defect created',
      },
      {
        eventTime: '2023-09-25 15:27:56',
        logContent:
          'Defect fixed for house with NPL 369258 in Bay 4, and the house model is 987-654',
        eventType: 'Defect fixed',
      },
      {
        eventTime: '2023-10-13 11:12:39',
        logContent:
          'New house created for customer Compton, with NPL 135791 and model No. 741-852',
        eventType: 'New house',
      },
      {
        eventTime: '2023-10-29 16:48:15',
        logContent: 'New customer added: Emily',
        eventType: 'New customer',
      },
      {
        eventTime: '2023-11-15 09:22:10',
        logContent:
          'House with NPL 135791 started for customer Gervais-Gullekson. The model No. is 741-852',
        eventType: 'House started',
      },
      {
        eventTime: '2023-11-28 13:54:31',
        logContent:
          'House with NPL 852147 completed for customer Gervais-Gullekson. The model No. is 963-852',
        eventType: 'House completed',
      },
      {
        eventTime: '2023-12-04 14:33:17',
        logContent:
          'Defect created for house 852147 in Bay 5 , and the house model is 963-852',
        eventType: 'Defect created',
      },
      {
        eventTime: '2023-12-20 15:45:00',
        logContent:
          'Defect fixed for house with NPL 852147 in Bay 5 , and the house model is 963-852',
        eventType: 'Defect fixed',
      },
    ]
    // Combine the response data with the fake logs
    const combinedLogs = [...response.data.result, ...fakeLogs]

    return combinedLogs

    // return response.data.result;
  } catch (error) {
    console.error('Error fetching bays:', error)
    throw error
  }
}

export default {
  getAllLogs,
}
