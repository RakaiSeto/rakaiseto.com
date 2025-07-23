---
title: SIPASTI

description: Information system for repair and recording of infrastructure facilities;

dateFormatted: JuL 21, 2025;

techstack: ["Laravel"]

---

![SiPasti](/assets/images/projects/sipasti/home.png)
SIPASTI is an information system for repair and recording of infrastructure facilities. The project is built using Laravel and MySQL. 

The project was built for completion of my 4th semester final project with 4 other friends of mine. The development took about 2 months to complete with most of the duration spent on the design and planning phase. Sipasti has been registered for Intellectual Property Rights under registration number 000910879.

Sipasti has 4 roles: 
- Admin: Responsible for managing the system and facilities data.
- Civitas: Students, Staffs, and Lecturers. Capable of reporting and requesting repair of infrastructure facilities.
- Sarpras: Responsible for managing and verifying reports. Sarpras can also assign technician to repair the infrastructure facilities according to report.
- Teknisi: Responsible for repairing the infrastructure facilities.

## Main Features
### Reporting 
If there's a problem with the infrastructure facilities, civitas can report it to the system. The report will be sent to  Sarpras to be reviewed.
![Reporting Form](/assets/images/projects/sipasti/reporting.png)

### Feedback
After the problem is resolved, civitas can give feedback on how well the problem is resolved.
![Feedback](/assets/images/projects/sipasti/feedback.png)

### Decision Support System
This feature is used to help Sarpras to make a decision on which report must be prioritized. The system will analyze the report based on several variables and will output the ranking with score. The system itself uses SAW and MOORA method to rank the report.
![DSS](/assets/images/projects/sipasti/dss.png)

You can try the system in [this link](https://sipasti.rakaiseto.com/).
The username are
admin
sarpras
teknisi
civitas

all of them have the same password: sipasti123

You can also check the github repository [here](https://github.com/rakaiseto/PBL-SIPASTI).