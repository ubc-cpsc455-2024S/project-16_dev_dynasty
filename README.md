![workflow](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/actions/workflows/cicd-backend.yml/badge.svg)

![workflow](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/actions/workflows/cicd-frontend.yml/badge.svg)

# BayBuild

BayBuild is a proof-of-concept project management web application designed for a modular home manufacturing
company to improve its organization and productivity. The company manufactures an average of eight houses per week in a factory
environment and relies primarily on manual planning and record-keeping systems. BayBuild  allows the
company to track its house manufacturing progress through a 20-bay production line, and automate the creation, modification,
and retrieval of house information including customer details, quality checks, defect records, and documents. The consistent and 
centralized storage of house information is critical for the construction team to ensure a controlled handoff between
production bays. An event logging feature in BayBuild allows managers to access metrics such as the average time spent per production 
line bay and the average number of houses manufactured per month.     

## Project Goals

### Minimal requirements

✔️ **Add House Record** - allow users to add a house record to the system (i.e., a house to be constructed) with information
including project number, model number, customer name, size, bay location, and status. 

✔️ **View Production Line Status Board** - allow users to view the Production Line Status Board and see the position of
each house in the 20 bays of production.

✔️ **Find House Record** - allow users to find a particular house in the system via a search and view details specific
to that house.

✔️ **Update House Status** - allow users to modify the status of a house and update its position in the 20-bay production 
line (e.g., a house that has completed all work in Bay 11 - "Electrical Rough In" can proceed to Bay 10 - "Insulation/Sheathing").

### Standard Requirements

✔️ **User Account Setup and Management** - allow administrators to create user accounts with different permission levels and
allow users to login and logout. 

✔️ **Create Fillable Quality Control Forms** - allow users to fill out standardized quality control checklists specific to
different areas of a house and flag defects. 

✔️ **Track House Progress on Production Line Status Board** - allow users to visualize the current status of each house on the Production Line Status Board (e.g., red = "work in progress", yellow = "QA required",
green = "work complete").

✔️ **Create, Modify, and Retrieve Defects** - allow users to create, modify, and retrieve defect records (including
images) specific to a house and production bay. 

✔️ **Attach External Documents to House Record** - allow users to attach external documents (e.g., images, contract
documents, construction drawings, etc.) to a house record. 

✔️ **Add Customer** - allow users to add a customer to the system  with information including customer name and contact details, and link each house with a
customer.

### Strech Requirements

✔️ **Drag and Drop Houses Between Stages** -  allow users to drag and drop houses between production line bays on the Production Line Status Board.

✔️ **Email Updates** - allow users to receive email updates detailing important information about a house's status.

✔️ **Business Metrics** - allow users to track metrics such as the average time spent per production 
line bay and the average number of houses manufactured per month. 

## Technologies Used

### Module 1: HTML, CSS, and JavaScript
HTML, CSS, and JavaScript were used extensively throughout the project, playing crucial roles in both the frontend and backend development.  HTML was used indirectly via MaterialUI to define the elements and layout of the JSX components created using React. CSS was used to apply styling to the JSX components, ensuring a visually appealing user interface. JavaScript was the primary coding language used for the project. On the frontend, JavaScript, combined with React and Redux, facilitated the development of a sophisticated and responsive user interface. On the backend, JavaScript code, executed in a Node.js environment, was used to handle all server-side functionality.       

### Module 2: React and Redux
The React JavaScript library and MaterialUI component library were integrated to develop a dynamic, responsive, and visually appealing user interface composed of reusable JSX components. React's component-based architecture allowed for modular development, promoting code reusability, consistent styling, easier collaboration, and simplified revisions. Redux was used to manage and update the global application state, ensuring data consistency across components and enabling efficient state transitions.

### Module 3: Node.js and Express.js
Node.js was used as the runtime environment to execute JavaScript code on the backend server. The Express.js framework was used with Node.js to handle routing and build RESTful API endpoints to serve responses to the HTTP requests generated from the frontend.   


### Module 4 : MongoDB
MongoDB database used on the backend to store all information for the application

### Module 5: GitHub Actions & Render
Setup a CI/CD pipeline using GitHub actions for backend and frontend. The workflows ensure that the backend tests are run, and the frontend build is run on both a push to main and a pull request before deploying  the project on Render. This ensures that there are no failing tests and that our frontend successfully builds before it is deployed to production. Branch protection was also setup so that pull requests with failing workflow are not able to be merged to main.

## Above and Beyond Functionality

### Industry Partnership
- Partnered with a real client to develop the project, ensuring that the application meets real-world needs and requirements.

### Automated Emails
- Integrated email sending functionality to send notification to users with Mailgun

### Amazon S3 Storage
- Implemented a system for storing pictures and documents using AWS S3 buckets

### PDF Previewer
- Developed a PDF previewer on the React frontend, allowing users to view PDF documents directly within the application from AWS S3 buckes. This feature provides a smooth and user-friendly experience by eliminating the need to download files for viewing.

### Checklist PDF Generation and Download

## Next Steps

- Business analytics (cost per square feet)
- Inventory management
- Timesheet management (employee management & payroll)  

  
## Team Member Contributions

### Andrew

### Andy
- Reproduced the Production Line Status Board layout for the company using CSS grid and implemented drag and drop functionalities for house cards to update their bays in the frontend.
- Set up MongoDB for the project and created Models for bays, houses, event logs, and users.
- Setup frontend Redux thunks and slices for houses, bays, event logs and users for react state management.
- Implemented user authentication and authorization system on the backend using jwt in cookies and setup frontend user management page and route protection based on user permissions.
- Setup CI/CD pipeline using GitHub actions for backend and frontend and deployed our project on Render. Wrote tests for backend that runs during the workflow to ensure continuous integration before sending it to production. 
- Implemented the event log system functionality on backend and frontend. 

### Justin
- Created the initial BayCard component in React to represent houses on the Production Line Status Board.
- Developed the "Add House" page, including designing a form to capture and validate user input, creating a backend API endpoint to handle POST requests for adding new houses to the MongoDB collection, and implementing an Async Thunk to update the Redux store.
-  Developed "Customers" functionality, including designing a form element to capture and validate user input, creating backend API endpoints to handle POST, GET, PUT, PATCH, and DELETE requests for manipulating the MongoDB customers collection, and connecting React and Redux frontend components to the backend APIs.
- Developed the "House Checklist" page featuring fillable form elements to capture user input. Designed a MongoDB schema to model the checklist document collection and created GET, PUT, and DELETE API endpoints for data manipulation. Additionally, implemented PDF generation and download functionality.      

### Ryan
- Found industry contact and managed all communication with the client.
- Set up all frontend pages with routing to allow other users to build upon them. Also, configured all initial routing for the Express backend. Established a folder structure and components for the team to expand on in frontend and backend.
- Restyled the entire app, and fixed major aesthetic bugs after proof of concept was built.

## Prototype Images

![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/b9d9575b-04bc-42a3-a2b6-9bf81a74fb0d)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/0401c1ef-a4f3-45f3-b53e-6e5887913ea9)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/622c59d6-bdaa-4f18-b34f-6606eac889ab)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/b5a287bc-fe09-4513-8aa3-a2ded5039860)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/bd651c65-5fda-4554-a3f6-07e351d3fb1f)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/975e489c-8bd3-4c90-a4a1-d4e6ead303e7)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/9eeb774b-fa80-42fe-b265-f5206c5d58bb)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/f8e03eaf-9638-4932-9052-7646dcd6fe6c)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/38717b3d-e95d-494f-b034-bfc8a40581f6)
![image](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/assets/62073529/a7983813-704d-409d-b03c-68d34e87257a)
