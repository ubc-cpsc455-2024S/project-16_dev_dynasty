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

In the frontend we broke down out our code into the following folders each with the following utility:

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

We have organized our Express app into a detailed set of folders to make it easier to locate specific information. Each folder contains files that pertain to a particular area of functionality. For example, the routes folder includes a houses.js file that handles the routes for houses, while the services folder contains a houseService.js file with all the database queries related to houses.

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

### Module 4 : MongoDB

MongoDB document database was used on the backend to store all information for the application. The Mongoose ODM was used to simplify database querying. All database related files were stored were the following folders in the express api:

- `models` folder - All data models / types
- `services` folder - All database queries

To perform joins on multiple collections in the backend, two joined "Views" were created in the models folder. These models combined data from multiple MongoDB collections. They could be queried like regular MongoDB collections. These views were called:

- `Bay_View`
- `House_View`

### Module 5: GitHub Actions & Render

Setup a CI/CD pipeline using GitHub actions for backend and frontend. The workflows ensure that the backend tests are run, and the frontend build is run on both a push to main and a pull request before deploying  the project on Render. Branch protection was also setup so that pull requests with failing workflow are not able to be merged to main.

## Above and Beyond Functionality

### Industry Partnership

- **Description:** Partnered with a real client to develop the project
- **Above and Beyond:**
  - Held an initial kickoff meeting with client
  - Defined client requirements and clarified additional requirements while building over email
  - Shared the deployed app with client to test and provide feedback
  - The client intends to continue using this app after the completion of the class.

### Automated Emails

- **Challenge of Integrating Mailing Services:** Integrating a reliable and efficient mailing service into our application was a critical task, given that emailing is one of the most time-consuming parts of the workflow. Our goal was to automate this process to help workers identify and fix defects more efficiently. However, finding the right SMTP service and API for an automated email bot proved to be challenging.

- **Initial Attempts with Gmail+nodemailer:** Initially, we attempted to use Gmail as our SMTP service. However, Gmail imposes several restrictions to prevent unauthorized access and ensure account security. It requires 2-factor authentication (2FA) and implements heuristics to detect and block suspicious login attempts, which posed significant obstacles. Gmail's concept of "Less Secure" apps further complicated matters, as it requires special configurations to allow applications to send emails without using OAuth 2.0. Despite these efforts, Gmail's restrictions often slowed down the demo and affected the overall reliability of our mailing system.

- **Transition to Mailgun:** To overcome these limitations, we switched to Mailgun, a dedicated email delivery service that supports automated emailing and offers advanced features like email analysis. By leveraging Mailgun, we not only enabled automatic mailing but also provided valuable email analytics that could benefit our customers by offering insights into email delivery and engagement.

- **Creating a Seamless Workflow:** To streamline the email process, we created a template that pre-fills much of the information needed for sending emails. By embedding the mailing service directly into the application, we ensured that the workflow remained smooth and efficient. This approach allow user to access the info in the app so it minimized manual input and reduced the potential for errors, enabling users to focus on more critical tasks while ensuring that communication remains prompt and accurate.


### File Storage and Retrieval 

- **Implementation of AWS S3 for Storage**: We implemented a robust system for storing pictures and documents using AWS S3 buckets, enabling secure and scalable file management. This setup allows us to efficiently handle large volumes of data while ensuring high availability and durability.
- **Integration with Multer**: To facilitate seamless file uploads, we integrated Multer, a middleware for handling multipart/form-data. This integration streamlined the process of uploading files to S3 directly from the application, ensuring a smooth and user-friendly experience.

### User Authentication and Authorization with Role based access control 
- Implemented user authentication and authorization using jwt in httpOnly and secure cookies and bcrypt
- Achieved role based access control on both frontend and backend 

### PDF Previewer

- **Challenge of PDF Rendering:** As a developer, I've frequently faced the challenge of providing a seamless PDF viewing experience on the web. While it might seem straightforward, rendering PDFs effectively across various devices and browsers can be complex. Simply opening PDFs in a new tab disrupts user experience by forcing them to switch contexts, while using iframes often leads to compatibility issues and security restrictions, especially in older browsers.
  
- **Initial Attempts:** My initial solutions included opening PDFs in new tabs and embedding them in iframes. However, both approaches had significant drawbacks. New tabs pull users away from the application and disrupt their workflow, while iframes suffer from cross-browser inconsistencies and can be hindered by security policies that prevent certain PDFs from rendering.

- **Finding a Solution:** Determined to create a more intuitive, in-page PDF viewing experience, I explored various libraries and ultimately discovered Mozilla’s PDF.js. PDF.js leverages readable streams to render PDFs efficiently, offering a robust foundation for implementing a seamless viewing experience.

- **Integration with React and AWS S3:** While PDF.js provided the functionality I needed, it wasn’t directly compatible with React applications out of the box. To address this, I developed a custom React component that integrates PDF.js, allowing us to render PDFs directly within the application. By pulling PDFs from URLs stored in AWS S3 buckets, we maintained a centralized and scalable document management system.
  
- **Performance Optimization with Multithreading:** A major challenge was rendering PDFs efficiently, particularly when downloading them from AWS S3 buckets, which can introduce latency. This issue became more pronounced when rendering multiple documents or thumbnails on a single page. To tackle this, I implemented multithreading on the frontend. By utilizing web workers, we offloaded PDF rendering tasks to separate threads, significantly speeding up the process and providing a smoother user experience. This approach ensured that the main UI thread remained responsive, even when handling multiple PDFs simultaneously.

- **User Experience Enhancement:** Incorporating the PDF previewer directly into our React frontend allowed users to view PDF documents without leaving the application. This feature preserves the user context and ensures a more cohesive and engaging experience. By maintaining document rendering within the app, we enhanced the overall usability and reliability of the feature, ensuring quick and consistent performance across different devices and browsers.

### Checklist PDF Generation and Download

## Next Steps

- Furthur develop on the Business analytics functionality (cost per square feet)
- Inventory management
- Timesheet management (employee management & payroll)
- Add refresh token functionality to jwt auths for better user experience
- Deploy frontend and backend to the same domain so that the jwt cookies could be set with the sameSite property to strict to help better prevent Cross-Site Request Forgery (CSRF) attacks and make our application more secure

## Team Member Contributions

### Andrew
- S3 Bucket Setup: Configured an S3 bucket for secure file storage and retrieval, addressing access permissions and implementing upload and download functionalities for managing house documents.
- PDF Management: Developed PDF preview and thumbnail functionalities to enable document viewing within the application, enhancing user experience with easy access to document previews.
- Automailing Service: Implemented an automailing service using Mailgun to automate user communications, ensuring timely delivery of updates and reports via email notifications.

### Andy
- Reproduced the Production Line Status Board layout for the company using CSS grid and implemented drag and drop functionalities for house cards to update their bays in the frontend.
- Implemented user authentication and authorization system on the backend using jwt in cookies and setup frontend user management page and route protection based on user permissions. Also implemented the event log system functionality on backend and frontend. 
- Setup CI/CD pipeline using GitHub actions for backend and frontend and deployed our project on Render. Wrote tests for backend that runs during the workflow to ensure continuous integration before sending it to production. 


### Justin
- Created the initial BayCard component in React to represent houses on the Production Line Status Board.
- Developed the "Add House" page, including designing a form to capture and validate user input, creating a backend API endpoint to handle POST requests for adding new houses to the MongoDB collection, and implementing an Async Thunk to update the Redux store.
- Developed "Customers" functionality, including designing a form element to capture and validate user input, creating backend API endpoints to handle POST, GET, PUT, PATCH, and DELETE requests for manipulating the MongoDB customers collection, and connecting React and Redux frontend components to the backend APIs.
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
