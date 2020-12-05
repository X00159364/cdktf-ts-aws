import { Construct } from 'constructs';
import { App, TerraformStack, TerraformOutput } from 'cdktf'
import { AwsProvider } from './.gen/providers/aws'
import {
  IamRole,
  LambdaFunction,
  ApiGatewayRestApi,
  ApiGatewayResource,
  ApiGatewayMethod,
  ApiGatewayIntegration,
  LambdaPermission,
  ApiGatewayDeployment,
  DataAwsRegion,
  DataAwsCallerIdentity,
  DynamodbTable,  
  IamPolicy,
  IamRolePolicyAttachment,
  // ApiGatewayMethodResponse,
  // ApiGatewayIntegrationResponse
} from "./.gen/providers/aws";

class CdktfStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here
    new AwsProvider(this, 'aws', {
      region: 'eu-west-1',
    })

    const role = new IamRole(this, "cdktf_basic_lambda_role", {
      description: "Basic Lambda Execution Role",
      assumeRolePolicy: `{ "Version": "2012-10-17", "Statement": [ {
       "Action": "sts:AssumeRole", "Principal": { "Service": "lambda.amazonaws.com" }, "Effect": "Allow", "Sid": "" } ] }`,
    });

    const fn = new LambdaFunction(this, "cdktf_lambda", {
      functionName: "insert",
      handler: "insert.lambda_handler",
      runtime: "python3.7",
      description: "A simple Hello world Lambda Function",
      role: role.arn,
      timeout: 60,
      filename: "../insert.zip",
    });

    const api = new ApiGatewayRestApi(this, "cdktf-api-gateway", {
      name: "cdktf-rest-api",
    });

    const resource = new ApiGatewayResource(this, "cdktf-api-gateway-resource", {
      restApiId: api.id!,
      parentId: api.rootResourceId,
      pathPart: "insert",
    });

    const get_method = new ApiGatewayMethod(this, "api-gateway-method", {
      restApiId: api.id!,
      resourceId: resource.id!,
      httpMethod: "GET",
      authorization: "NONE",
    });

    const post_method = new ApiGatewayMethod(this, "post-api-gateway-method", {
      restApiId: api.id!,
      resourceId: resource.id!,
      httpMethod: "POST",
      authorization: "NONE",
    });

    const integration = new ApiGatewayIntegration(
      this,
      "api-gateway-integration",
      {
        restApiId: api.id!,
        resourceId: resource.id!,
        httpMethod: get_method.httpMethod,
        integrationHttpMethod: "POST",
        type: "AWS_PROXY",
        uri: fn.invokeArn,
        dependsOn: [get_method],
      }
    );

    const region = new DataAwsRegion(this, "region");
    const userId = new DataAwsCallerIdentity(this, "userId");

    const table = new DynamodbTable(this, 'cdktf-dynamodb', {
      name: "cdktf-dynamodb",
      hashKey: "ID",
      rangeKey: "LatestGreetingTime",    
      readCapacity: 20,
      writeCapacity: 20,
      attribute: [
        { name: "ID", type: "S" },
        { name: "LatestGreetingTime", type: "S" }
      ],
      billingMode: "PROVISIONED"
    })

    const dynamodbPolicy = new IamPolicy(this, 'cdktf_dynamodbPolicy', {
      name: 'cdktf_dynamodbPolicy',
      path: '/',
      description: 'IAM policy for dynamoDB',
      policy: JSON.stringify({
          Version: "2012-10-17",
          Statement: [{
              Action: [
                "dynamodb:PutItem",
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:UpdateItem"
              ],
              Resource: "arn:aws:dynamodb:eu-west-1:592715633892:*",
              Effect: "Allow"
          }]
      }),
  });

  new IamRolePolicyAttachment(this, 'lambdaLogs', {
      role: role.name!,      
      // policyArn: `${cdktf_dynamodbPolicy.arn}`
      policyArn: dynamodbPolicy.arn
  });

    const insert = new LambdaFunction(this, "cdktf_insert_lambda", {
      functionName: "cdktf_insert_lambda",
      handler: "insert.lambda_handler",
      runtime: "python3.7",
      description: "A simple Hello world Lambda Function",
      role: role.arn,
      timeout: 60,
      filename: "../insert.zip",
    });    

    new LambdaPermission(this, "apigw-lambda-permission", {
      action: "lambda:InvokeFunction",
      principal: "apigateway.amazonaws.com",
      functionName: insert.functionName,
      sourceArn:
        "arn:aws:execute-api:" +
        region.name +
        ":" +
        userId.accountId +
        ":" +
        api.id +
        "/*/" +
        post_method.httpMethod +
        resource.path,
    });

    const post_integration = new ApiGatewayIntegration(
      this,
      "post-api-gateway-integration",
      {
        restApiId: api.id!,
        resourceId: resource.id!,
        httpMethod: post_method.httpMethod,
        integrationHttpMethod: "POST",
        type: "AWS",
        uri: insert.invokeArn,
        dependsOn: [post_method],
      }
    );

    const deployment = new ApiGatewayDeployment(
      this,
      "api-gateway-deployment",
      {
        restApiId: api.id!,
        stageName: "dev",
        stageDescription: "Dev Environment",
        description: "Dev Environment",
        dependsOn: [get_method, post_method, integration, post_integration],
        // dependsOn: [post_method, post_integration],
      }
    );
    
    // const response200 = new ApiGatewayMethodResponse(
    //   this,
    //   "response200",   
    //   {
    //     restApiId: api.id!,
    //     resourceId: api.rootResourceId,
    //     httpMethod: post_method.httpMethod,
    //     statusCode: "200",
    //     // responseModels: {
    //     //   "application/json": "Empty"
    //     // },
    //     responseModels: { "application/json": "Empty" }
    //     // responseParameters: response.ResponseParameters,
    //   }); 

    // const integration_response = new ApiGatewayIntegrationResponse(
    //   this,
    //   "integration_response",   
    //   {
    //     restApiId: api.id!,
    //     resourceId: api.rootResourceId,
    //     httpMethod: post_method.httpMethod,
    //     statusCode: response200.statusCode
    //   }
    // );     

    new TerraformOutput(this, "endpoint", {
      value: deployment.invokeUrl,
    });  
    
    new TerraformOutput(this, "db", {
      value: table.arn,
    });      

    // new TerraformOutput(this, "post", {
    //   value: post_integration.uri,
    // });     
    
    // new TerraformOutput(this, "int_response", {
    //   value: integration_response.fqn,
    // });  
  }
}

const app = new App();
new CdktfStack(app, 'cdktf-aws');
app.synth();
