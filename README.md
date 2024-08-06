![workflow](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/actions/workflows/cicd-backend.yml/badge.svg)

![workflow](https://github.com/ubc-cpsc455-2024S/project-16_dev_dynasty/actions/workflows/cicd-frontend.yml/badge.svg)

# BayBuild

BayBuild is a proof-of-concept project management web application designed for a modular home manufacturing
company to improve its organization and productivity. The company manufactures an average of eight houses per week in a factory
environment and relies primarily on manual planning and record-keeping systems. BayBuild  allows the
company to track its house manufacturing progress through a 20-bay production line, and automate the creation, modification,
and retrieval of house information including customer details, quality checks, defect records, and documents. The consistent and 
centralized storage of house information is critical for the construction team to ensure a controlled handoff between
production stages. An event logging feature in BayBuild allows managers to access metrics such as the average time spent per production 
line bay and the average number of houses manufactured per month.     

## Project Goals

### Minimal requirements

✔️ **Add House Record** - allow users to add a house record to the system (i.e., a house to be constructed) with information
including project number, model number, customer name, size, bay location, and status. 

✔️ **View Production Line Status Board** - allow users to view the production line status board and see the position of
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

✔️ **Track House Progress on Production Line Status Board** - allow users to visualize the current status of each house on the production line status board (e.g., red = "work in progress", yellow = "QA required",
green = "work complete").

✔️ **Create, Modify, and Retrieve Defects** - allow users to create, modify, and retrieve defect records (including
images) specific to a house and production bay. 

✔️ **Attach External Documents to House Record** - allow users to attach external documents (e.g., images, contract
documents, construction drawings, etc.) to a house record. 

✔️ **Add Customer** - allow users to add a customer to the system  with information including customer name and contact details, and link each house with a
customer.

### Strech Requirements

✔️ **Drag and Drop Houses Between Stages** -  allow users to drag and drop houses between production line bays on the production line status board.

✔️ **Email Updates** - allow users to receive email updates detailing important information about a house's status.

✔️ **Business Metrics** - allow users to track metrics such as the average time spent per production 
line bay and the average number of houses manufactured per month. 

## Technologies Used

### Module 1: Front-End UI (HTML/CSS/Javascript)

### Module 2: Front-End Framework (React & Redux)

### Module 3: Database (MongoDB)

### Module 4: Release Engineering (GitHub Actions & Render)

## Above and Beyond Functionality

## Next Steps

- Business metrics
- Inventory management
- Automated email status updates

## Team Member Contributions

### Andrew

### Andy

### Justin

### Ryan

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
