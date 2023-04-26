import subprocess
import json
import sys
import re

def get_analysis(event):
    """
    Function used to get the sentiment analysis information from the AWS Lambda Function from 
    the response.json file generated after invoking the function with the following command 
    # cat response.json
    Returns sentiment analysis as a string
    """
    cmd = ['cat', 'response.json']
    analysis = subprocess.check_output(cmd)
    data = json.loads(analysis)
    POS_PERCENT = data["POS_PERCENT"]
    body = data["body"].strip()
    body = body.replace("\\n", "\n")
    analysis = body.replace("Event", event)
    
    return analysis, POS_PERCENT
    

def get_api_gateway_url():
    """
    Function used to retrieve API Gateway Url with the following command: 
    # aws cloudformation describe-stacks --stack-name ov-stack --query 'Stacks[0].Outputs[?OutputKey==`ApiGatewayInvokeURL`].OutputValue' --output text
    Returns url as a string
    """
    cmd = ['aws', 'cloudformation', 'describe-stacks', '--stack-name', 'ov-stack', '--query', "Stacks[0].Outputs[?OutputKey=='ApiGatewayInvokeURL'].OutputValue", '--output', 'text']
    api_url = subprocess.check_output(cmd)
    api_url = api_url.strip() # Remove newline character from string ('/n')

    return api_url

def get_app_id():
    """
    Function use to retrieve Amplify App ID for 'ov-amplify' app with the following command:
    # aws amplify list-apps --query "apps[?name=='ov-amplify'].[appId]" --output text
    Returns ID as a string
    """
    command = ['aws', 'amplify', 'list-apps', '--query', "apps[?name=='ov-amplify'].[appId]", '--output', 'text']
    app_id = subprocess.check_output(command)
    app_id = app_id.strip() # Remove newline character from string ('/n')

    return app_id

def get_amplify_status(): 
    """
    Function use to retrieve Amplify Status for 'ov-amplify' app with the following command:
    # aws amplify list-apps --query "apps[?name=='ov-amplify'].[productionBranch.status]" --output text
    Returns status as a string
    """
    command = ['aws', 'amplify', 'list-apps', '--query', "apps[?name=='ov-amplify'].[productionBranch.status]", '--output', 'text']
    amplify_status = subprocess.check_output(command)
    amplify_status = amplify_status.strip()

    return amplify_status

def get_amplify_url(app_id):
    """
    Function use to generate Website URL for otterview based on provided app_id:
    Returns url as a string
    """
    url = 'https://main.{}.amplifyapp.com/'.format(app_id)
    
    return url 

def init_technologies(): 
    """
    Function used to initalize all AWS Technologies in use by creating an AWS Cloudformation Stack via provided template file with the following command: 
    # aws cloudformation deploy --template-file ov_setup.yml --stack-name ov-stack --capabilities CAPABILITY_NAMED_IAM
    Returns 0 if command ran with no errors 
    """
    # Define the AWS CLI command to create the CloudFormation stack
    command = ['aws', 'cloudformation', 'deploy', '--template-file', 'ov_setup.yml', '--stack-name', 'ov-stack', '--capabilities', 'CAPABILITY_NAMED_IAM']

    # Execute the AWS CLI command using subprocess
    result = subprocess.check_call(command)

    return result
    

def launch_backend(event, collection_time): 
    """
    Function used to lauch otterview backend by invoking an AWS lambda function thats gets, analyze, and stores the comments in a AWS DynamoDB based on provided event name with the following command:
    # aws lambda invoke --function-name ov-lambda --cli-binary-format raw-in-base64-out --payload '{"event_name": event}' response.json
    Returns 0 if command ran with no errors 
    """
    # Define the function name and payload
    function_name = 'ov-lambda'
    payload =  {"event_name": event, "collection_time": collection_time}

    # Define the AWS CLI command to invoke the Lambda function
    command = ['aws', 'lambda', 'invoke', '--function-name', function_name, '--cli-binary-format', 'raw-in-base64-out', '--payload', json.dumps(payload), 'response.json']

    # Execute the AWS CLI command using subprocess
    result = subprocess.check_call(command)
    
    return result
    

def launch_frontend(POS_PERCENT): 
    """
    Function used to launch otterview frontend by updating the amplify app with the URL to the API Gateway
    and then building the web-application with the following commands :
    # aws amplify update-app --app-id {app_id} --environment-variables REACT_APP_ENV_API_URL={api_url},REACT_APP_ENV_POS_PERCENT={pos_percent}
    # aws amplify start-job --app-id {app_id} --branch-name main --job-type RELEASE  
    Returns 0 if command ran with no errors 
    """
    api_url = get_api_gateway_url()

    app_id = get_app_id()

    amplify_url = get_amplify_url(app_id)

    # Define the AWS Amplify CLI command to update the app
    update_command = ['aws', 'amplify', 'update-app', '--app-id', app_id, '--environment-variables', 'REACT_APP_ENV_API_URL={},REACT_APP_ENV_POS_PERCENT={}'.format(api_url, POS_PERCENT)]
    build_command = ['aws', 'amplify', 'start-job', '--app-id', app_id, '--branch-name', 'main', '--job-type', 'RELEASE']

    # Execute the AWS Amplify CLI command using subprocess
    result = subprocess.call(update_command)
    result = subprocess.call(build_command)

    build_status = get_amplify_status()

    print('--- WEBSITE BUILDING, PLEASE WAIT --- ')
    # While web app is building, continue checking stautus until done. 
    while build_status != "SUCCEED": 
        build_status = get_amplify_status()

    print('ACCESS OTTERVIEW WEBSITE : ' + amplify_url)
    
    return result 


if __name__ == '__main__':

    print("~~~ Welcome to Otterview! ~~~")
    print("An Event Sentiment Analysis Tool")

    event = raw_input("Please enter the name of your event to begin: ")
    collection_time = raw_input("Please enter how long you would like to collect data (in seconds): ")

    print("--- INITALIZING AWS TECHNOLOGIES ---")
    result = init_technologies()
    if result != 0 : 
        print("--- ERROR INITALIZING TECHNOLOGIES ---")
        sys.exit()
    print("--- AWS TECHNOLOGIES INITALIZED ---")
    
    print("--- LAUNCHING BACKEND ENVIRONMENT ---")
    result = launch_backend(event, collection_time)
    if result != 0 : 
        print("--- ERROR INITALIZING BACK-END ---")
        sys.exit()
    analysis, POS_PERCENT = get_analysis(event)
    print(analysis)
    print(" --- BACKEND ENVIRONMENT CREATED, EVENT SENTIMENT ANALYSIS COMPLETED ---")
    
    print("--- LAUNCHING FRONT END ENVIRONMENT ---")
    result = launch_frontend(POS_PERCENT)
    if result !=0: 
        print("--- ERROR LAUNCHING FRONT-END ---")
        sys.exit()  
    print("--- FRONT END CREATED ---")
    
    
    

    



    

    

