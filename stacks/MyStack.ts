import { StackContext, Table, Api } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Pass in the table name to our API
        environment: {
          tableName: table.tableName,
        },
      },
    },
    routes: {
      "POST /": "functions/lambda.handler",
    },
  });

  // Allow the API to access the table
  api.attachPermissions([table]);

  // Show the URLs in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}