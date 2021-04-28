# CANOMIKS DASHBOARD

## Description

_Duration: 2 Week Sprint_

This project is a dashboard used by Canomik's Clients and Canomik's Admin. Users can login and an request account if they're a new client. Once logged in a User may add samples in required fields and shipping information relative to the sample order. This way the Clients and Admins may view up to date order shipping information. Admins may update the profile status of Client's Companies to active/inactive.

Previously clients would be unaware of accurate shipping and order information. Clients would mail their order and simply wait to hear back from Canomiks.

We replaced this outdated method by created a centralized location where Clients and Admins from Canomiks can search status updates, order information, profile details, and even download and view a PDF result of the product testing.

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shot

![Email sent from the dashboard](/documentation/screenshots/email.png)
Example of an email triggered by a lab tech moving a sampel through the testing process.

## Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

1. Create a database named 'canomiks_db'
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!
7. In the `.env` file you will have to add a few enviorment vairables, these will include:
   - EMAIL : put the ougtoing email address here
   - PASSWORD : put the password for the outgoing email here
   - JWT_SECRET : this should bea random long secret string that is secure. It can be
   - REACT_APP_AWS_ACCESS_KEY_ID
   - REACT_APP_AWS_SECRET_ACCESS_KEY
   - REACT_APP_AWS_BUCKET
   - REACT_APP_AWS_REGION

# Usage

## Customer

A customer of Canomiks could be a supplier, manufacturer or anybody who wants to send in ingredients to be analyzed by Canomiks. The customer will be able request an account and pending contract approval, submit sample and shipping information for ingredients they are sending into the lab. The customer will also be able to access the details and test status of any given ingredient, and they will be automatically notified by email (based on their notification settings) whenever there is an update or delay in testing. Once a sample has completed its testing, the customer will be able to access the results via their dashboard - these results will certify the efficacy of the ingredient. The customer will also receive an automatic email with this information.

### Request Account

- A new customer can request an account using the request account form
- This will include forms for both thecompany information and contact information
- A customer will also have the option to opt in or out of email notifications via toggles
- Once a customer requests an account, the account status will be inactive
  - Inactive means that the customer cannot log in to their account
  - Only an admin account can change the status of a customer (detailed in Admin section)

### Log In / Forgot Password

- Customers will be able to log in with their email once the account status has been switched to active
- A customer also has the ability to change their password if they forget their current password

### Customer Dashboard

- A customer will be able to view all current samples, and also any samples that they have begun filling out information about, but haven't completed
- Each ingredient's details will be able to be viewed by selecting 'View Details' in its corresponding row
  - The details will display the current test phase at the top along with the option to 'View Results' if the test is completed.
- The customer will be able to search through their samples by ingredient name, in order to find a specific item
- Additionally the customer will be able to add new sample information by selecting '+SAMPLE' (detailed in next section)

### Add Sample Information

- The customer will be able to enter all relevant information about the sample they are sending in to be tested
  - This includes, lot number, type, amount, crop/harvest information, etc.A
- This form will automatically save if the customer navigates away for any reason
- Selecting 'Cancel Request' will clear the form and remove the current order
- Selecting 'Continue Later' will navigate the customer back to their dashboard, but all of the information in the form will be saved, and the sample that was being worked on will be displayed on the dashboard with a warning, to alert the customer that the sample/shipping forms are not completed
- Selecting 'Next: Shipping Info' will bring the customer to the next form, where they can enter shipping information, and then 'Finalize' the order

## Admin / Lab Technician

The admin and lab roles within the dashboard are both able to view and update orders. The admin has the ability to activate and deactivate customer accounts, based on the status of their contract. If a customer account is marked as inactive, they will no longer be able to log in, which prevents them from sending further ingredients for sampling.
As a lab technician, the dashboard will display every current order, along with all incoming shipments. This allows the lab to make space for expected orders. The table of orders can be sorted by each header, and the lab technician can sort by company name and also choose to view all delayed orders. When a lab technician updates an order's testphase, the dashboard will automatically trigger a email notification to the customer, informing them of the update. Lastly, a lab technican has the ability to upload the test results once the test is marked as 'Complete'.

### Log In

- Lab and admin will have the same log in options as customers - with the same forgotten assword functionality

### Manage Customers

- Only admins will have access to the manage customers page
- This will display all companies with both active and inactive contracts
- The admin can search by company name
- Viewing the company details will display information about the company and the contact
- The admin can toggle the company's status as active or inactive
  - Inactive accounts will not be able to log in, thereby blocking them from submitting samples until they renew their contract

### Lab Dashboard

- Both lab technicians and admins will have access to this dashboard
- The lab tech will be able to see every order and every incoming order
- The orders can be sorted by each header
  - The tech can search by company name or check the 'Delayed orders' box to display only delayed orders
- The lab tech will have to option to view the details of a specific order, and within the details, select the corresponding test phase, to update the order
  - This will trigger an email notification to the customer
- The lab can also mark an order as delayed if the need arises
  - This will trigger an email notification as well
- If an order is marked as being in the 'Complete' test phase, the lab tech will have the option to upload the test results
  - The customer will have access to these results within their dashboard

## Built With

- HTML
- CSS
- Node JS
- JavaScript
- React-Redux
- AWS S3
- PostgreSQL
- Nodemailer
- JSON Web Tokens

## License

[MIT](https://choosealicense.com/licenses/mit/)

_Note, include this only if you have a license file. GitHub will generate one for you if you want!_

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped us to make this application a reality. Especially to our instructors Edan and Chad. Thank you to Leena Pradhan-Nabzdyk and Ashley Moyna from Canomiks who shared their vision with us. Thank you to our cohort and all those who've developed these technologies, we truly stand on the shoulders of giants.

## Support

If you have suggestions or issues, please email me at [youremail@whatever.com](www.google.com)
