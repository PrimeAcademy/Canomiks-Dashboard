# Amazon Web Services Setup
Amazon Simple Storage Service (AWS S3) is an object storage service that allows customers to use it to store and protect any amount of data for a range of use cases.
To be able to upload and download the pdf of the results on to AWS, please follow the instructions in this document. 

## Installations
$ npm install react-s3

##  Setup
1. Go to console.aws.amazon.com
2. Register to create an account
3. Navigate to the "Services" on the top right. 
4. Click on S3

![](/public/s3.png)



5. Click the organge button that says "Create 
Bucket" 
<img src="public/createBucket">
6. Name your bucket
7. Select a region (whatever would be closest to your location) and remember what you selected
8. Scroll to the bottom of the page and click Create Bucket



9. Click on your new bucket and navigate to the Permissions tab 

10. The first option is Block public access (bucket setting) - click Edit  and choose to turn OFF blocking all public access (so it looks like below). There will be a model that requires you to type confirm - go ahead and do that.

<img src="public/bucketSettings">


11. In permissions, scroll down to find Cross-Origin Resource Sharing (CORS) and click Edit

<img src="public/CORS">

11a. In the CORS text box, paste this code:

[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]


12. Back in the browser, go to console.aws.amazon.com/iam

13. Click on Groups link under Access Management

14. click on Create New Group 

15. Name the group (could be taco)

16. The next page should be titled Attach Policy - check the box for AmazonS3FullAccess

17. The next page should give you the option to Create Group


18. Back on the dashboard page, click on Users link under Access Management

19. Click on Add User

20. Name the user, you can name it whatever it is

21. Under Access Type check the Programmatic Access box

22. The next page, give this user access to the group we just created

23. You can skip the Tags portion

24. Review and click Create User

25. The next page will have your security credentials

<img src="public/success">

26. Copy and paste the security keys into a .env file

<img src="public/env">

27. Go to the LabDetail component and open LabDetail.jsx. Below is the config.

<img src="public/config">


28. This is the upload code. You can update it as needed.

<img src="public/upload">


29. Setup is complete. Click the upload button and it should make a POST request to your bucket, and a GET request to get the preview. Check your bucket on AWS as well to see that the image has been uploaded.
















