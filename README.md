# Group 16 DevDynasty - BayBuild

## BayBuild

BayBuild is a project management web application specifically designed for a modular home construction company to streamline their business processes. The company constructs up to 25 homes daily and currently depends on a manual planning and record-keeping system. BayBuild enables the company to track homes through a 20 stage production line and automates the creation, modification, and retrieval of quality check and approval documents, ensuring a controlled handoff between construction stages. Additional functionalities, such as business analytics, inventory management and automated email status updates, may be implemented based on time constraints.

## Team Members

- Yelin (Andy) Hu: Passionate about building exciting products!
- Andrew Liu: Passionate about web dev with AI integration!
- Justin Burden: Former geotechnical engineer and aspiring software developer!
- Person 4: one sentence about you!

--------------------------------------------------------------------------------------------------
## Project Requirements

### Minimal requirements

1. **Add Home Record** - allow users to add a home record to the system (i.e., a home to be constructed) and add details including home number, price, size, and model number and status.

2. **View Production Line Status Board** - allow users to view the production line status board and see the position of each home in the 20 stages of production.

3. **Find Home Record** - allow users to find a particular home in the system via a search and view the record specific to that home.

4. **Modify Home Record (Update Home Status)** - allow users to modify a home record and update the position of a home in the 20 stage production line (e.g., a home that has completed all work at the electrical stage and can be moved forward to the next stage, plumbing).

### Standard Requirements

1. **User Account Setup and Management** - allow administrators to create accounts with different permission levels and allow them to login and logout. 

2. **Create Fillable Quality Control Forms** - allow users to fill out a standardized quality control form/checklist specific to each of the 20 production stages.

3. **Track Home Progress on Production Line Status Board** - allow users to visualize the current status of each home on the production line status board (e.g., red = "work in progress", yellow = "pending quality control check and approval", green = "complete").

4. **Create, Modify, and Retrieve Defects** -  allow users to create, modify, and retrieve defect records (including images) specific to a home and production stage.
 
5. **Attach External Documents to House Record** - allow users to attach external documents (e.g., images, contract documents, construction drawings, etc.) to a home record. 

6. **Customer Record Management** -  allow users to add, edit, and delete a customer record and link each home with a customer.


### Strech Requirements

1. **Drag and Drop Houses Between Stages** -  allow users to drag and drop houses between production line stages on the production line status board. 

2. **Automated Email Status Updates** - allow users to receive automated daily updates on the status of homes on the production line status board.

3. **Business Analytics** - allow users to access business analytics such as average time spent per production line stage and average square ft. of home production per day.

--------------------------------------------------------------------------------------------------

## Breakdown of Two Minimal Requirements

1. **Add Home Record** 
- Design the database schema to store the required information.
- Deploy the database and connect it to our application.
- Create a button and form to allow information submission. 

2. **View Production Line Status Board** 
- Allow users to view the production line status board and see the position of each home in the 20 stages of production.
- Once a new home is added to the system, allow users to see the new home represented on the status board at the beginning production stage.
- Once the stage of a house is updated, the production stage board should reflect the change and move the home accordingly to the next production stage.
  
--------------------------------------------------------------------------------------------------

## Images

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


--------------------------------------------------------------------------------------------------

## References

{Add your stuff here}



