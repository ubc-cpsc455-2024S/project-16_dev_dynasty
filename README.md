![workflow](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/actions/workflows/cicd-backend.yml/badge.svg)

![workflow](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/actions/workflows/cicd-frontend.yml/badge.svg)

# BayBuild

BayBuild is a proof-of-concept project management web application designed for a modular home manufacturing
company to improve its organization and productivity. The company manufactures an average of eight houses per week in a factory
environment and relies primarily on manual planning and record-keeping systems. BayBuild allows the
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

✔️ **Add Customer** - allow users to add a customer to the system with information including customer name and contact details, and link each house with a
customer.

### Strech Requirements

✔️ **Drag and Drop Houses Between Stages** -  allow users to drag and drop houses between production line bays on the Production Line Status Board.

✔️ **Email Updates** - allow users to receive email updates detailing important information about a house's status.

✔️ **Business Metrics** - allow users to track metrics such as the average time spent per production
line bay and the average number of houses manufactured per month.

## Technologies Used

### Module 1: HTML, CSS, and JavaScript

HTML, CSS, and JavaScript were used extensively throughout the project, playing crucial roles in both the frontend and backend development. HTML was used indirectly via MaterialUI to define the elements and layout of the JSX components created using React. CSS was used to apply styling to the JSX components, ensuring a visually appealing user interface. JavaScript was the primary coding language used for the project. On the frontend, JavaScript, combined with React and Redux, facilitated the development of a sophisticated and responsive user interface. On the backend, JavaScript code, executed in a Node.js environment, was used to handle all server-side functionality.

### Module 2: React and Redux

The React JavaScript library and MaterialUI component library were integrated to develop a dynamic, responsive, and visually appealing user interface composed of reusable JSX components. React's component-based architecture allowed for modular development, promoting code reusability, consistent styling, easier collaboration, and simplified revisions. Redux was used to manage and update the global application state, ensuring data consistency across components and enabling efficient state transitions.

In the frontend we organized our code into the following folders each with the following utility:

```
Frontend/
│
├── components/ -> [React components for the UI]
│
├── constants/ -> [Constants used throughout the application]
│
├── pages/ -> [Page / screens in the application]
│
├── redux/ -> [Manage all redux state for the app]
│
├── router/ -> [All relevant routes and the main router component]
│
└── styles/ -> [Global styles]
```

### Module 3: Node.js and Express.js

Node.js was used as the runtime environment to execute JavaScript code on the backend server. The Express.js framework was used with Node.js to handle routing and build RESTful API endpoints to serve responses to the HTTP requests generated from the frontend.

We have organized our Express.js backend code into a detailed set of folders to make it easier to locate specific information. Each folder contains files that pertain to a particular area of functionality. For example, the routes folder includes a "houses.js" file that handles the routes for houses, while the services folder contains a "houseService.js" file with all the database queries related to houses.

```
Backend/
│
├── checklist_templates/ -> [Checklist template files for pdfs]
│
├── data/ -> [Mock data]
│
├── middleware/ -> [Authentication middleware]
│
├── models/ -> [Database model types]
│
├── routes/ -> [Route Definitions]
│
├── services/ -> [Database Queries and Helper Logic]
│
└── tests/ -> [Test files for the application]
```

### Module 4: MongoDB

A MongoDB document database with eight unique collections was used on the backend to store all information for the application. The Mongoose ODM was used to simplify database querying. All database related files were organized into the following folders in the Express.js backend code:

- `models` folder - All data models / types
- `services` folder - All database queries

To perform complex queries involving multiple collections in the backend, two aggregation pipelines, referred to as "Views", were created in the models folder. They could be queried like regular MongoDB collections. These views were called:

- `Bay_View`
- `House_View`

### Module 5: GitHub Actions & Render

A CI/CD pipeline was set up using GitHub Actions for both the backend and frontend code. The workflows ensured that backend tests were executed and the frontend build was performed on every push to the main branch and on every pull request targeting the main branch. Additionally, the project was deployed on Render following these checks. Branch protection was also configured to prevent merging pull requests with failing workflows into the main branch.

## Above and Beyond Functionality

### Industry Partnership

- **Challenge of an Industry Partnership**: Commit additional time to the project to find a client, meet with them about their requirements, and change the design of project if need be in a limited timeframe.

- **Initial Collaboration**: We held an early kickoff meeting to discuss the company's operations and gather initial requirements.

- **Ongoing Communication**: Throughout development, we communicated via email to clarify and define additional requirements.

- **Testing and Feedback**: Late in the process, we shared the deployed URL with our contact for testing and feedback.

- **Future Opportunities**: There may be opportunities to continue developing the application on behalf of the company after completing this class.

### Automated Emails

- **Challenge of Integrating Mailing Services:** Integrating a mailing service into our application was a critical task, given that emailing is one of the most time-consuming parts of the workflow. Our goal was to automate this process to help workers identify and fix defects more efficiently. However, finding the right SMTP service and API for an automated email bot was challenging.

- **Initial Attempts with Gmail+nodemailer:** Initially, we attempted to use Gmail as our SMTP service. However, Gmail imposes several restrictions to prevent unauthorized access such as 2-factor authentication (2FA) or special configuration. Therefore we weren't able to use Gmail+nodemailer.

- **Transition to Mailgun:** To overcome these limitations, we switched to Mailgun. By using Mailgun, we not only enabled automatic mailing but also provided valuable email analytics (included in mailgun) that could benefit our customers by offering insights into email delivery and engagement.

- **Creating a Seamless Workflow:** To streamline the email process, we created a template that pre-fills much of the information needed for sending emails and embedded the mailing service directly into the application. This approach allows users to access the info in the app so it minimizes manual input.

### File Storage and Retrieval 

- **Implementation of AWS S3 for Storage**: We implemented a system for storing pictures and documents using AWS S3 buckets, enabling secure and scalable file management. 
  
- **Integration with Multer**: To facilitate seamless file uploads, we integrated Multer, a middleware for handling multipart/form-data. This integration streamlined the process of uploading files to S3 directly from the application.

### User Authentication and Authorization with Role based access control 
- Implemented user authentication and authorization using JWT in httpOnly and secure cookies and bcrypt.
- Achieved role based access control on both frontend and backend.


### User Authentication and Authorization with Role-Based Access Control:

- **Secure Authentication:** Implemented user authentication using JSON Web Tokens (JWT) stored in httpOnly and secure cookies to prevent XSS and CSRF attacks. Utilized bcrypt for hashing and securely storing user passwords.

- **Role-Based Access Control:** Established role-based access control to manage permissions effectively. 
  
- **Backend Implementation:** Integrated role-based access control within the backend API using middleware to verify JWTs and enforce role permissions on protected routes. This ensures that only authorized users can perform specific actions, such as creating, updating, or deleting data.
  
- **Frontend Implementation:** Implemented role-based access control and route protection on the frontend to conditionally render components and features based on the user's role. This provides a tailored user experience and restricts unauthorized access to certain parts of the application.


### PDF Previewer

- **Challenge of PDF Rendering:** As a developer, I've frequently faced the challenge of providing a seamless PDF viewing experience on the web. While it might seem straightforward, rendering PDFs effectively across various devices and browsers can be complex. Simply opening PDFs in a new tab disrupts user experience by forcing them to switch contexts, while using iframes often leads to compatibility issues and security restrictions, especially in older browsers.
  
- **Initial Attempts:** My initial solutions included opening PDFs in new tabs and embedding them in iframes. However, both approaches had significant drawbacks. New tabs pull users away from the application and disrupt their workflow, while iframes suffer from cross-browser inconsistencies and can be hindered by security policies that prevent certain PDFs from rendering.

- **Finding a Solution:** Determined to create a more intuitive, in-page PDF viewing experience, I explored various libraries and ultimately discovered Mozilla’s PDF.js. PDF.js leverages readable streams to render PDFs efficiently, offering a robust foundation for implementing a seamless viewing experience.

- **Integration with React and AWS S3:** While PDF.js provided the functionality I needed, it wasn’t directly compatible with React applications out of the box. To address this, I developed a custom React component that integrates PDF.js, allowing us to render PDFs directly within the application. By pulling PDFs from URLs stored in AWS S3 buckets, we maintained a centralized and scalable document management system.
  
- **Performance Optimization with Multithreading:** A major challenge was rendering PDFs efficiently, particularly when downloading them from AWS S3 buckets, which can introduce latency. This issue became more pronounced when rendering multiple documents or thumbnails on a single page. To tackle this, I implemented **multithreading** on the frontend. By **utilizing web workers**, we offloaded PDF rendering tasks to separate threads, significantly speeding up the process and providing a smoother user experience. This approach ensured that the main UI thread remained responsive, even when handling multiple PDFs simultaneously.

- **User Experience Enhancement:** Incorporating the PDF previewer directly into our React frontend allowed users to view PDF documents without leaving the application. This feature preserves the user context and ensures a more cohesive and engaging experience.

### Checklist PDF Generation and Download

- **Workflow**: The House Checklist page features fillable forms for users to input quality control information. To facilitate easy dissemination of this information to stakeholders, we needed to convert it into PDF format. This process involved sending an HTTP request to the backend to query the checklist data from the MongoDB database, generating a PDF file on the backend, and then sending this PDF to the frontend for download. Handling PDF generation on the backend ensured the PDFs could be generated efficiently without negatively impacting the user experience on the frontend.
  
- **PDF Generation**: The main challenge in implementing the checklist PDF feature was finding a JavaScript library that could easily convert JSON data into a tabular format. We researched and tested multiple libraries, including pdfmake, jsPDF, and PDFKit. Ultimately, we identified PDFKit-table, a JavaScript wrapper for the PDFKit library, as the best choice. Checklist data retrieved from the MongoDB document database was converted into a format compatible with the PDFKit-table API. The API handled the data on the backend, generating the PDF. The resulting PDF was then sent in an HTTP response to the frontend for download.   

## Next Steps

- **User Authentication Improvements:** Implement refresh token functionality in JWT authentication to enhance the user experience by allowing seamless token renewal without requiring frequent logins.
  
- **Deployment Improvements:** Deploy the frontend and backend to the same domain so that the JWT cookies can be set with the 'SameSite' attribute set to 'Strict', enhancing security by better preventing Cross-Site Request Forgery (CSRF) attacks.
  
- **Business Analytics Integration:** The event logging feature in our application captures the essential data needed to perform advanced business analytics, offering valuable insights to the management team for optimizing business processes. For example, data on the time and cost of constructing each home such as bay construction times, labor productivity, and material usage, could reveal process improvement and cost reduction opportunities. An intuitive dashboard could be integrated into the existing UI to effectively report and visualize these data. 
  
- **Inventory Management Integration:** An inventory management system would allow the company to efficiently track and manage materials throughout the home building process, helping to minimize excess stock and prevent shortages. Integration with the current application would involve capturing real-time inventory levels in the database and allowing users to record material usage as house construction progresses through each bay on the production line. This integration would enable real-time updates and alerts on material levels, optimizing procurement and reducing project delays.
  
## Team Member Contributions

### Andrew
- S3 Bucket Setup: Configured an S3 bucket for secure file storage and retrieval, addressing access permissions and implementing upload and download functionalities for managing house documents.
- PDF Management: Developed PDF preview and thumbnail functionalities to enable document viewing within the application, enhancing user experience with easy access to document previews.
- Automailing Service: Implemented an automailing service using Mailgun to automate user communications, ensuring timely delivery of updates and reports via email notifications.

### Andy
- Reproduced the Production Line Status Board layout for the company using CSS grid and implemented drag and drop functionalities for house cards to update their bays in the frontend.
- Implemented user authentication and authorization system on the backend using JWT in cookies and setup frontend user management page and route protection based on user permissions. Also implemented the event log system functionality on backend and frontend. 
- Setup CI/CD pipeline using GitHub actions for backend and frontend and deployed our project on Render. Wrote tests for backend that runs during the workflow to ensure continuous integration before sending it to production. 


### Justin
- Add House page: designed a form to capture and validate user input, created a backend API endpoint to handle POST requests for adding new houses to the MongoDB collection, and implemented an Async Thunk to update the Redux store.
- Customers functionality: designed a form element to capture and validate user input, created backend API endpoints to handle POST, GET, PUT, PATCH, and DELETE requests for manipulating the MongoDB customers collection, and connected React and Redux frontend components to the backend APIs.
- House Checklist page: created fillable form elements to capture user input, designed a MongoDB schema to model the checklist document collection, created GET, PUT, and DELETE API endpoints for data manipulation, and implemented PDF generation and download functionality.      

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
